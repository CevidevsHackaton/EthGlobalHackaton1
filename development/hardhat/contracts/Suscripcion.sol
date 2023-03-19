// SPDX-License-Identifier: // MIT
pragma solidity >=0.7.0 <0.9.0;

//ISuperfluid.sol es la interfaz para interactuar con el protocolo de Superfluid.
//ISuperToken.sol es la interfaz para interactuar con los tokens de Superfluid.

import "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";
import "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/Superfluid.sol";

import "@openzeppelin/contracts/access/Ownable.sol";


//Ownable es un contrato de la biblioteca de contratos de OpenZeppelin que define una funcionalidad básica para controlar la propiedad del contrato.
//ISuperfluid que almacenará la dirección del contrato de Superfluid.
//ISuperToken que almacenará la dirección del token de Superfluid que se utilizará como método de pago para la suscripción al servicio
//_subscriptionPrice almacenará el precio de la suscripción en el token aceptado.

contract SubscriptionService is Ownable {
    Superfluid private _superfluid;
    ISuperToken private _acceptedToken;
    uint256 private _subscriptionPrice;

    mapping(address => bool) private _subscribers;


//SubscriberRegistered se emite cuando un usuario se registra como suscriptor en el servicio.
//SubscriberCancelled se emite cuando un usuario cancela su suscripción.
    event SubscriberRegistered(address indexed subscriber);
    event SubscriberCancelled(address indexed subscriber);

//superfluidAddress es la dirección del contrato de Superfluid que se utiliza para el manejo de pagos.
//acceptedTokenAddress es la dirección del token que se acepta como pago en el servicio de suscripción.
// subscriptionPrice es el precio de la suscripción en la moneda del token aceptado.


    constructor(
        address superfluidAddress,
        address acceptedTokenAddress,
        uint256 subscriptionPrice
    ) {
        _superfluid = ISuperfluid(superfluidAddress);
        _acceptedToken = ISuperToken(acceptedTokenAddress);
        _subscriptionPrice = subscriptionPrice;
        
    }

//

    function register() external {

        //valida si el usuario ya esta suscrito
        require(!_subscribers[msg.sender], "Already subscribed");

        //transfiere token del usuario al contrato
        //aprueba al contrato de Superfluid a gastar los tokens transferidos
        _acceptedToken.transferFrom(msg.sender, address(this), _subscriptionPrice);
        _acceptedToken.approve(address(_superfluid), _subscriptionPrice);

        // activa un flujo de tokens desde el contrato hacia el usuario
        // La función toma un objeto con cuatro parámetros: el token a ser utilizado (superToken), la dirección del remitente (sender), la dirección del receptor (receiver) y el flujo de tokens (flowRate).
        _superfluid.flow({
            superToken: address(_acceptedToken),
            sender: address(this),
            receiver: msg.sender,
            flowRate: _subscriptionPrice
        });

        _subscribers[msg.sender] = true;

        // notificando que un nuevo suscriptor se ha registrado con éxito

        emit SubscriberRegistered(msg.sender);
    }

    //require comprueba si el remitente está registrado como suscriptor. Si el remitente no está registrado, se lanzará una excepción con el mensaje "Not subscribed".
    // getFlow en el contrato de Superfluid obtiene la información de flujo del remitente.

    function cancelSubscription() external {
        require(_subscribers[msg.sender], "Not subscribed");

        (,int96 flowRate,,) = _superfluid.getFlow(
            address(_acceptedToken),
            address(this),
            msg.sender
        );

        //establece el flujo a cero para el remitente, lo que detiene el flujo de tokens de Superfluid.

        _superfluid.flow({
            superToken: address(_acceptedToken),
            sender: msg.sender,
            receiver: address(this),
            flowRate: uint256(flowRate) // Stop the flow
        });

        //actualiza el estado del suscriptor en el mapa _subscribers, estableciendo el valor en false.

        _subscribers[msg.sender] = false;

        emit SubscriberCancelled(msg.sender);
    }


    //verifica si la dirección del suscriptor especificado está en la lista de suscriptores y devuelve un valor booleano
    function isSubscriber(address subscriber) external view returns (bool) {
        return _subscribers[subscriber];
    }


    //puede ser llamada por el propietario del contrato, y establece el precio de la suscripción a un nuevo valor especificado
    function setSubscriptionPrice(uint256 newSubscriptionPrice) external onlyOwner {
        _subscriptionPrice = newSubscriptionPrice;
    }

    //devuelve el precio de la suscripción actual.
    function getSubscriptionPrice() external view returns (uint256) {
        return _subscriptionPrice;
    }

    //solo puede ser llamada por el propietario del contrato y retira el balance actual de tokens aceptados en el contrato y los transfiere a la dirección del propietario del contrato.
    function withdraw() external onlyOwner {
        _acceptedToken.transfer(owner(), _acceptedToken.balanceOf(address(this)));
    }
}