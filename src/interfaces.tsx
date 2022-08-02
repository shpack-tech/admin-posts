export interface IPost {
	title: string;
	authorName: string;
	previewPicture: {
		name: string;
		url: string;
	};
	tagNames: string[];
	createdAt: string;
}

export type IFullPostData = IPost & {
	id: number;
	previewPicture: {
		id: number;
	};
	updatedAt: string;
};

export interface IPostsState {
	posts: IPost[];
	pagination: IPagination;
}

export interface IPagination {
	current: string;
	pageCount: string;
	perPage: string;
	total: string;
}

export interface IAuthData {
	authToken: string;
	refreshToken: string;
	authExpires: number;
	refreshExpires: number;
}

export interface IAction {
	payload: IAuthData;
	type: string;
}

export interface ILoginData {
	login: string;
	password: string;
}

export interface I422AuthErrorItem {
	field: string;
	message: string;
}
