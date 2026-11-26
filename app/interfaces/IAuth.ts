export interface IResetPassWord {
	token: string;
	password: string;
}

export type IFormResetPassWord = {
	defaultValues?: Partial<
		IResetPassWord & {
			confirmation: string;
		}
	>;
};
