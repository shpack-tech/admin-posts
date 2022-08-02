import React from 'react';
import { IPost } from '../../../interfaces';
import './single-post.scss';

const SinglePost: React.FC<IPost> = ({ title, authorName, previewPicture, tagNames, createdAt }) => {
	return (
		<div className="post-container  ant-card-bordered">
			<div className="post-info">
				<div className="post-info_title">{title}</div>
				<div className="post-info_author">{authorName}</div>
			</div>
			<div className="post-img">
				<img src={previewPicture.url} alt={previewPicture.name} />
			</div>
			<div className="post-tags">
				{tagNames.map((el, i) => {
					return (
						<div className="post-tags_tag" key={i}>
							{el}
						</div>
					);
				})}
			</div>
			<div className="post-date">{new Date(createdAt).toLocaleDateString()}</div>
		</div>
	);
};

export default SinglePost;
