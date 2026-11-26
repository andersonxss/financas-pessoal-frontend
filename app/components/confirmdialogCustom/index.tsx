// import { ConfirmDialog } from 'primereact/confirmdialog';

type IConfirmCustom = {
	message?: string;
	header?: string;
	icon?: string;
	visible?: boolean;
	onHide?: () => void;
	accept?: any;
	reject?: () => void;
};
// const styleButton =
//   'bg-black-alpha-10 border-1 border-white-alpha-30 hover:bg-black-alpha-60 text-black-alpha-60 min-w-0 h-2rem text-white text-xs';

const ConfirmdialogCustom = ({
	message,
	header,
	visible,
	icon,
	onHide,
	accept,
	reject,
}: IConfirmCustom) => {
	return (
		<div>ConfirmdialogCustom</div>
		// <ConfirmDialog
		//   visible={visible}
		//   onHide={onHide}
		//   accept={accept}
		//   reject={reject}
		//   message={message}
		//   header={header}
		//   icon={icon}
		//   acceptLabel="Sim"
		//   rejectLabel="Não"
		//   // headerClassName="bg-black-custom text-white"
		//   // contentClassName="bg-black-custom text-white"
		//   // acceptClassName={styleButton}
		//   // rejectClassName={styleButton}
		//   className="border-1 border-white-alpha-30"
		//   // pt={{
		//   //   headerTitle: {
		//   //     className: 'text-white',
		//   //   },
		//   //   footer: {
		//   //     className: 'bg-black-custom',
		//   //   },
		//   // }}
		// />
	);
};

ConfirmdialogCustom.defaultProps = {
	message: "",
	header: "",
	icon: "pi pi-exclamation-triangle",
	visible: false,
	onHide: undefined,
	detail: "",
};

export default ConfirmdialogCustom;
