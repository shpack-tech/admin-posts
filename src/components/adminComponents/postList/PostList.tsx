import React, { useEffect } from 'react';
import SinglePost from '../singlePost/SinglePost';
import PostPagination from '../postPagination/PostPagination';
import { IPost } from '../../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthors, getPosts, getTags } from '../../../reduxLogic/actions';
import { RootState } from '../../../reduxLogic/mainReducer';
import AddPostModal from '../addPostModal/AddPostModal';
import './post-list.scss';

const PostList: React.FC = () => {
	const dispatch = useDispatch();
	const { posts, pagination } = useSelector((store: RootState) => store.posts || []);
	const { authToken } = useSelector((store: RootState) => store.auth || false);

	useEffect(() => {
		if (authToken && authToken !== '') {
			dispatch(getPosts());
			dispatch(getAuthors());
			dispatch(getTags());
		}
	}, []);

	return (
		<>
			<div style={{ paddingBottom: '50px' }}>
				<div className="post-list">
					{posts.length ? (
						posts.map((el: IPost, i: number) => {
							return (
								<SinglePost
									key={i}
									title={el.title}
									authorName={el.authorName}
									previewPicture={{ url: el.previewPicture.url, name: el.previewPicture.name }}
									tagNames={el.tagNames}
									createdAt={el.createdAt}
								/>
							);
						})
					) : (
						<h1>Загрузка...</h1>
					)}
				</div>
				{pagination.total !== '' ? (
					<PostPagination current={pagination.current} total={pagination.total} perPage={pagination.perPage} pageCount={pagination.pageCount} />
				) : (
					''
				)}
			</div>
			<AddPostModal />
		</>
	);
};

export default PostList;
