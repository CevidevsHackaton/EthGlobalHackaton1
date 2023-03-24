// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;



// Declaración del contrato de suscripciones
contract Subscription  {
    uint256  priceMembership;
    address  owner ;

        // Array que almacena todas las direcciones de los usuarios suscritos
    address[] public subscribersArray;
    // Contador de orden
    uint256 subscriptionCount;
    // Arreglo que almacena los números de orden de todas las suscripciones realizadas
    uint256[] public subscriptionNumbers;

    // Estructura que almacena información de cada suscriptor
    struct Subscriber {
        bool isSubscribed;      // Indica si el suscriptor está suscrito
        uint256 expirationDate; // Fecha de expiración de la suscripción
        uint256 subscriptionNumber; // Número de orden de la suscripción
    }
    
    // Dirección del propietario del contrato
    
    // Mapeo que asocia cada dirección con la información del suscriptor
    mapping(address => Subscriber) public subscribers;

    //Orden de cada subscripcion con su orden
    mapping(address => uint[] ) public orderSubscribers;
    
    
    // Evento que se dispara cuando se suscribe un nuevo usuario
    event NewSubscriber(address indexed subscriber, uint256 expirationDate);
    
    // Evento que se dispara cuando se renueva una suscripción
    event SubscriptionRenewed(address indexed subscriber, uint256 expirationDate);


    // Verificador para asegurarnos de que solo el propietario pueda ejecutar ciertas funciones
    modifier onlyOwner() {
        require(msg.sender == owner, 
        "Solo el propietario puede ejecutar esta funcioon"
        );
        _;
    }

       
    // Constructor del contrato
    constructor(uint _priceMembership)  {
        priceMembership = _priceMembership;
        owner=msg.sender;
    }

     // Verificador para aceptar el valor del pago de la suscripción
    modifier needPriceMembership() {
        require(
            msg.value == priceMembership , 
            "El valor enviado no coincide con el precio de la membresia"
        );
        _;
    }   
    // Función para suscribirse
    function subscribe(uint256 durationInDays) public payable needPriceMembership  {
        require(!subscribers[msg.sender].isSubscribed, "El usuario ya esta suscrito");
        
        uint256 expirationDate = block.timestamp + (durationInDays * 1 days);
        uint256 subscriptionNumber = ++subscriptionCount;

        subscribers[msg.sender] = Subscriber(true, expirationDate, subscriptionNumber); 
        // Mandado la wallet al array 
        subscribersArray.push(msg.sender);
        subscriptionNumbers.push(subscriptionNumber);

        emit NewSubscriber(msg.sender, expirationDate);
    }
    
    // Función para renovar una suscripción
    function renewSubscription(uint256 durationInDays) public payable needPriceMembership  {

        
        uint256 expirationDate = subscribers[msg.sender].expirationDate + (durationInDays * 1 days);
        subscribers[msg.sender].expirationDate = expirationDate;
        
        emit SubscriptionRenewed(msg.sender, expirationDate);
    }
    
    // Función para verificar si un usuario está suscrito
    function isSubscriber(address user) public view returns (bool) {
        return subscribers[user].isSubscribed;
    }
    
    // Función para obtener la fecha de expiración de la suscripción de un usuario
    function getExpirationDate(address user) public view returns (uint256) {
        return subscribers[user].expirationDate;
     }

    function getAllSubscribers() public view onlyOwner returns (address[] memory) {
        return subscribersArray; 
    }

    function getOrderSubscribers() public view onlyOwner returns (uint[] memory) {
        return subscriptionNumbers; 
    }
}
    