import * as Dialog from '@radix-ui/react-dialog'
import './Modal.css'

export function Modal({ trigger, title, children }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content className="modal-content">
          <Dialog.Title className="modal-title">{title}</Dialog.Title>
          {children}
          <Dialog.Close className="modal-close">Cerrar</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}