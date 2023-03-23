import { useRef, useEffect, useState, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import HyperModal from 'react-hyper-modal'
import { IModalProps } from 'react-hyper-modal/dist/types'

export const Portal = (props: IModalProps) => {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal")
    setMounted(true)
  }, [])

  return (mounted && ref.current) ? createPortal(
    <div >
      <HyperModal {...props}>{props.children}</HyperModal>
    </div>, ref.current) : null
}