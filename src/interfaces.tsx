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

export interface IAuthor {
	id: number;
	name: string;
	lastName: string;
	secondName: string;
}

export interface ITag {
	id: number;
	name: string;
}

export interface IPostsState {
	posts: IPost[];
	pagination: IPagination;
	authors: IAuthor[] | [];
	tags: ITag[] | [];
	errorList: string[];
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
export type IAuthTokens = Omit<IAuthData, 'authExpires' | 'refreshExpires'>;

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

export interface IPostTemplate {
	code: string;
	title: string;
	authorId: string;
	tagIds: string[];
	text: string;
	previewPicture: File;
}
