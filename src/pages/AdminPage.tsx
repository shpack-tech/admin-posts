import React from 'react';
import PostList from '../components/adminComponents/postList/PostList';
const AdminPage: React.FC = () => {
	return (
		<div className="admin-body default-content">
			<PostList />
		</div>
	);
};

export default AdminPage;
