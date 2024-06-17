// hàm khi thành công
export const success = (res, messsage = '', data = []) => {
	return res.status(200).json({ data: { result: true, message: messsage, ...data }, error: null });
};

// hàm thực thi khi thất bại
export const setError = (res, message, code = 500) => {
	return res.status(code).json({ result: false, data: null, code, error: { message } });
};