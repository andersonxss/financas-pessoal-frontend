import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { Switch } from "@/components/ui/switch";
import {
	statusPago,
	statusAberto,
	statusPagoId,
	statusAbertoId,
} from "@/constants/tipoStatus";

const ButtonActionUpdateState = ({
	id,
	name,
	route,
}: {
	id: string;
	name: string;
	route: string;
}) => {
	const navigate = useNavigate();
	const location = useLocation();
	const checkedStatus = useMemo(() => {
		return name === statusPago;
	}, [name]);
	const statusId = name === statusAberto ? statusPagoId : statusAbertoId;

	if (!name || !id) {
		return null;
	}

	return (
		<Switch
			checked={checkedStatus}
			onClick={async () => {
				await navigate(
					`/${route}/status/${id}/${statusId}?path=${encodeURIComponent(location.pathname)}`,
					{ replace: true },
				);
			}}
		/>
	);
};

export default ButtonActionUpdateState;
