import React, { useState } from 'react';
import { Space, Button, Modal, Input, Alert, Upload, Select } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reduxLogic/mainReducer';
import { useDispatch } from 'react-redux';
import { newPost } from '../../../reduxLogic/actions';
const AddPostModal: React.FC = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const [code, setCode] = useState<string>('');
	const [title, setTitle] = useState<string>('');
	const [text, setText] = useState<string>('');
	const [tagList, setTagList] = useState<string[]>([]);
	const [author, setAuthor] = useState<number>();
	const [image, setImage] = useState<any>();

	const { tags, authors, errorList } = useSelector((store: RootState) => store.posts || []);

	const dispatch = useDispatch();

	const tagsJSX: any = [];
	const authorsJSX: any = [];

	tags.forEach((el) => {
		tagsJSX.push(
			<Select.Option value={el.id} label={el.name} key={el.id}>
				{el.name}
			</Select.Option>
		);
	});

	authors.forEach((el) => {
		authorsJSX.push(
			<Select.Option value={el.id} label={`${el.name} ${el.lastName} ${el.secondName}`} key={el.id}>
				{el.name} {el.lastName} {el.secondName}
			</Select.Option>
		);
	});

	const showModal = () => {
		setIsModalVisible(true);
	};
	const hideModal = () => {
		setIsModalVisible(false);
	};

	const handleSubmit = async () => {
		dispatch(newPost({ code: code, title: title, authorId: author + '', tagIds: tagList, text: text, previewPicture: image }));
	};

	const noRequest = (val: any) => {
		setImage(val);
		return false;
	};

	return (
		<>
			<Button type="primary" onClick={showModal} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
				Новый пост
			</Button>
			<Modal title="Basic Modal" visible={isModalVisible} footer={false} onCancel={hideModal}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
				>
					<Space direction="vertical" style={{ width: '100%' }}>
						<Input required placeholder="Код" value={code} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)} />
						<Input required placeholder="Название" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
						<Input.TextArea placeholder="Текст" value={text} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)} />
						<Select
							aria-required
							mode="multiple"
							allowClear
							style={{
								width: '100%',
							}}
							onChange={(val) => {
								setTagList(val);
							}}
							children={tagsJSX}
							placeholder="Теги"
						/>
						<Select
							aria-required
							allowClear
							style={{
								width: '100%',
							}}
							children={authorsJSX}
							onChange={(val) => {
								setAuthor(val);
							}}
							placeholder="Автор"
						/>

						<Upload multiple={false} beforeUpload={noRequest}>
							<Button>Загрузить картинку</Button>
						</Upload>

						{errorList.length > 0
							? errorList.map((el, i) => {
									return <Alert key={i} type="warning" message={el} />;
							  })
							: ''}

						<Space direction="horizontal">
							<Button htmlType="submit">Отправить</Button>
							<Button
								onClick={() => {
									setCode('');
									setText('');
									setTitle('');
								}}
							>
								Очистить поля
							</Button>
						</Space>
					</Space>
				</form>
			</Modal>
		</>
	);
};

export default AddPostModal;
