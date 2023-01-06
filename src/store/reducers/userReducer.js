const DEFAULT_STATE = {
    userList: [
        {
            id: 1,
            maSV: 1,
            hoTen: "man.nguyen",
            soDienThoai: "1234567",
            email: "man@gmail.com",
        },
        {
            id: 2,
            maSV: 2,
            hoTen: "khai.nguyen",
            soDienThoai: "123456",
            email: "khai@gmail.com",
        }
    ],
    selectedUser: null,
}; //Tạo state mặc định
export const userReducer = (state = DEFAULT_STATE, action) => {
    const {type, payload} = action; //Bóc tách phần tử

    switch (type) {
        case "ADD_USER":{
            const data = [...state.userList];
            data.push({
                ...payload,
                id: Date.now(),
            })
            state.userList = data;
            break;
        }
        case "SET_SELECTED_USER":{
            state.selectedUser = payload;
            break;
        }
        case "UPPDATE_USER": {
            state.selectedUser = null;
            state.userList = state.userList.map(ele => ele.id === payload.id ? payload : ele)
            break;
        }

        case "DELETE_USER": {
            state.userList = state.userList.filter(ele => ele.id = payload.id ? false : true);
            break;
        }
        default:
            break;
    }

    return {...state} //trả về 1 sate mới để ko bị dính địa chỉ vùng nhớ
}