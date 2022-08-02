import React from 'react';
import { Pagination } from 'antd';
import { useDispatch } from 'react-redux';
import { IPagination } from '../../../interfaces';
import { changePage } from '../../../reduxLogic/actions';

/**
 * В рекомендуемом antd есть пагинация, так что использовал ее
 *
 * Как реализовал похожую задачу без библиотеки: https://github.com/shpack-tech/profilance-tz/blob/master/src/components/Pagination/Pagination.tsx
 */

const PostPagination: React.FC<IPagination> = ({ current, total, pageCount, perPage }) => {
	const dispatch = useDispatch();

	function changeHandler(page: any): void {
		dispatch(changePage(page));
	}

	return <Pagination current={+current} onChange={changeHandler} data-perpage={perPage} pageSize={+perPage} data-totalitems={total} total={+total} />;
};
export default PostPagination;
