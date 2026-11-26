export interface IFormConvite {
	email: string;
	role: string;
}

export interface IFormConviteAceite {
	token: string;
	name: string;
	password: string;
}

export interface IFormConviteAceiteValues
	extends IFormConviteAceite,
		Record<string, unknown> {
	confirmation: string;
}

export interface IConviteAceiteResponse {
	userId: string;
	tenant: string | null;
}

export type IformConviteValueDefault = {
	defaultValues?: {
		email: string;
		role: string;
	};
};

export type IformConviteAceiteValueDefault = {
	defaultValues?: IFormConviteAceiteValues;
};

export interface IConviteItem {
	id: string;
	email: string;
	role: string;
	expiresAt: string;
	acceptedAt: string | null;
}

export interface IConvites {
	items: Array<IConviteItem>;
	limit: number;
	page: number;
	pages: number;
	total: number;
}
