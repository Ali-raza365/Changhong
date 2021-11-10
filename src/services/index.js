import Axios from './axios';
// import axios from 'axios'
import preferences from '../common/preferences';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';



export const _LOGIN_API = (email, password,) =>
    new Promise(async (resolve, reject) => {
        try {
            // const requestBody = new FormData()
            // requestBody.append('email', email)
            // requestBody.append('password', password)
            // console.log("_LOGIN_API ", axios, { email, password })
            // let details = { email, password }
            const response = await Axios.post('/login', { email, password });
            const { data } = response;
            console.log('login', 'response', data);
            setTimeout(() => {
                resolve({
                    data: data
                });
            }, 3000)
        } catch (error) {
            console.log('login', 'error', error);
            console.log('login', 'error.response.message', error.message);
            // console.log('login', 'error.response', error.response);
            reject(error);
        }
    });



export const _REGISTER_API = (details) =>
    new Promise(async (resolve, reject) => {
        try {
            console.log(details, "_REGISTER_API")
            const response = await Axios.post('/register', details);
            const { data } = response;
            console.log('register', 'response', data);
            setTimeout(() => {
                resolve({
                    data: data
                });
            }, 3000)

        } catch (error) {
            console.log('register', 'error', error);
            console.log('register', 'error.response.message', error.message);
            // console.log('register', 'error.response', error.response);
            reject(error);
        }
    });



export const _BarcodeScanApi = (code) =>
    new Promise(async (resolve, reject) => {
        try {
            console.log(code, "_BarcodeScanApi code")
            const response = await Axios.post('/barcode-scan', { code });
            const { data } = response;
            console.log('_BarcodeScanApi', 'response', data);
            setTimeout(() => {
                resolve({
                    data: data
                });
            }, 3000)
        } catch (error) {
            console.log('_BarcodeScanApi', 'error', error);
            console.log('_BarcodeScanApi', 'error.response.message', error.message);
            // console.log('register', 'error.response', error.response);
            reject(error);
        }
    });

export const _BarcodeScanImageUploadApi = (details) =>
    new Promise(async (resolve, reject) => {
        try {

            console.log(details, "_BarcodeScanImageUploadApi ")
            const response = await Axios.post('/barcode-scan-image-upload', details
                , {
                    header: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    }
                });
            const { data } = response;
            console.log('_BarcodeScanImageUploadApi', 'response', data);
            setTimeout(() => {
                resolve({
                    data: data
                });
            }, 3000)
        } catch (error) {
            console.log('_BarcodeScanImageUploadApi', 'error', error);
            console.log('_BarcodeScanImageUploadApi', 'error.response.message', error.message);
            // console.log('register', 'error.response', error.response);
            reject(error);
        }
    });


export const _BarcodeDetailApi = (code) =>
    new Promise(async (resolve, reject) => {
        try {
            console.log(code, "_BarcodeDetailApi code")
            const response = await Axios.post('/get-barcode-detail', { barcode: code });
            const { data } = response;
            console.log('_BarcodeDetailApi', 'response', data);
            setTimeout(() => {
                resolve({
                    data: data
                });
            }, 3000)
        } catch (error) {
            console.log('_BarcodeDetailApi', 'error', error);
            console.log('_BarcodeDetailApi', 'error.response.message', error.message);
            // console.log('register', 'error.response', error.response);
            reject(error);
        }
    });


export const _AddVoucherManuallyApi = (details) =>
    new Promise(async (resolve, reject) => {
        try {
            const requestBody = new FormData()
            requestBody.append('barcode', details.barcode)
            requestBody.append('user_name', details.user_name)
            requestBody.append('product_price', details.product_price)
            requestBody.append('model_number', details.model_number)
            requestBody.append('incentive', details.incentive)
            requestBody.append('address', details.address)
            requestBody.append('shop_name', details.shop_name)
            requestBody.append('quantity', details.quantity)
            requestBody.append('mobile_number', details.mobile_number)
            requestBody.append('voucher_number', details.voucher_number)
            requestBody.append('created_date', details.created_date)
            requestBody.append('created_by', details.created_by)
            requestBody.append('dealer', details.dealer)
            requestBody.append('invoice_photo', details.invoice_photo)


            console.log(details, "_AddVoucherManuallyApi code")
            const response = await Axios.post('/voucher-add', requestBody, {
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            });
            const { data } = response;
            console.log('_AddVoucherManuallyApi', 'response', data);
            setTimeout(() => {
                resolve({
                    data: data
                });
            }, 3000)
        } catch (error) {
            console.log('_AddVoucherManuallyApi', 'error', { ...error });
            console.log('_AddVoucherManuallyApi', 'error.response.message', error.message);
            // console.log('register', 'error.response', error.response);
            reject(error);
        }
    });


export const _GetAllVouchersApi = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/get-all-vouchers');
            const { data } = response;
            console.log('_GetAllVouchersApi', 'response', data);
            setTimeout(() => {
                resolve(data.success);
            }, 3000)
        } catch (error) {
            console.log('_GetAllVouchersApi', 'error', { ...error });
            // console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_GetAllVouchersApi', 'error.response.message', error.message);
            reject(error);
        }
    });


export const _WalletWithdrawApi = (details) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/withdraw-request', details);
            const { data } = response;
            console.log('_WalletWithdrawApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_WalletWithdrawApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_WalletWithdrawApi', 'error.response.message', error.message);
            reject(error);
        }
    });

export const _GetBankListApi = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/bank-list');
            const { data } = response;
            console.log('_GetBankListApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 1000)
        } catch (error) {
            console.log('_GetBankListApi', 'error', { error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_GetBankListApi', 'error.response.message', error.message);
            reject(error);
        }
    });


export const _GetTransactionHistoryApi = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/wallet-history');
            const { data } = response;
            console.log('_GetTransactionHistoryApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_GetTransactionHistoryApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_GetTransactionHistoryApi', 'error.response.message', error.message);
            reject(error);
        }
    });




export const _GetFaqApi = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/faq-fetch');
            const { data } = response;
            console.log('_GetFaqApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_GetFaqApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_GetFaqApi', 'error.response.message', error.message);
            reject(error);
        }
    });


export const _GetAnswerApi = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/conversation-messages', { conversation_id: id });
            const { data } = response;
            console.log('_GetAnswerApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_GetAnswerApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_GetAnswerApi', 'error.response.message', error.message);
            reject(error);
        }
    });


export const _GetQNAApi = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/conversations');
            const { data } = response;
            console.log('_GetQNAApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_GetQNAApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_GetQNAApi', 'error.response.message', error.message);
            reject(error);
        }
    });

export const _GetCoursesApi = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/all-courses');
            const { data } = response;
            console.log('_GetCoursesApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_GetCoursesApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_GetCoursesApi', 'error.response.message', error.message);
            reject(error);
        }
    });

export const _AddFavoriteCourseApi = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/favorite', { elearning_id: id });
            const { data } = response;
            console.log('_AddFavoriteCourseApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_AddFavoriteCourseApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_AddFavoriteCourseApi', 'error.response.message', error.message);
            reject(error);
        }
    });

export const __AddIntoFinishedApi = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/add-finished', { elearning_id: id });
            const { data } = response;
            console.log('__AddIntoFinishedApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('__AddIntoFinishedApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('__AddIntoFinishedApi', 'error.response.message', error.message);
            reject(error);
        }
    });


export const _GetFavoriteCourseApi = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/get-favorite');
            const { data } = response;
            console.log('_GetFavoriteCourseApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_GetFavoriteCourseApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_GetFavoriteCourseApi', 'error.response.message', error.message);
            reject(error);
        }
    });

export const _GetFinishedCourseApi = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/get-finished');
            const { data } = response;
            console.log('_GetFinishedCourseApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_GetFinishedCourseApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_GetFinishedCourseApi', 'error.response.message', error.message);
            reject(error);
        }
    });



export const _GetStockApi = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/get-stock');
            const { data } = response;
            console.log('_GetStockApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_GetStockApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_GetStockApi', 'error.response.message', error.message);
            reject(error);
        }
    });

export const _StockOrderApi = (details) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/stock-order', details);
            const { data } = response;
            console.log('_StockOrderApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_StockOrderApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_StockOrderApi', 'error.response.message', error.message);
            reject(error);
        }
    });


export const _GetSaleReportApi = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/sale-report');
            const { data } = response;
            console.log('_GetSaleReportApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_GetSaleReportApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_GetSaleReportApi', 'error.response.message', error.message);
            reject(error);
        }
    });


export const _GetTrainingListApi = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/get-training-list');
            const { data } = response;
            console.log('_GetTrainingListApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_GetTrainingListApi', 'error', { error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_GetTrainingListApi', 'error.response.message', error.message);
            reject(error);
        }
    });


export const _GetTrainingHistoryApi = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/get-training-history');
            const { data } = response;
            console.log('_GetTrainingHistoryApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_GetTrainingHistoryApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_GetTrainingHistoryApi', 'error.response.message', error.message);
            reject(error);
        }
    });

export const _StartTrainingApi = (details) =>
    new Promise(async (resolve, reject) => {
        try {
            console.log(details, "_StartTrainingApi")
            const response = await Axios.post('/start-training', details);
            const { data } = response;
            console.log('_StartTrainingApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_StartTrainingApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_StartTrainingApi', 'error.response.message', error.message);
            reject(error);
        }
    });

export const _EndTrainingApi = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/end-training', { training_id: id });
            const { data } = response;
            console.log('_EndTrainingApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_EndTrainingApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_EndTrainingApi', 'error.response.message', error.message);
            reject(error);
        }
    });

export const _EndTrainingUploadImageApi = (details) =>
    new Promise(async (resolve, reject) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        try {
            console.log("_EndTrainingUploadImageApi", details, "dsssssssssssss");
            const response = await Axios.post('/end-training-image', details, config
            );
            const { data } = response;
            console.log('_EndTrainingUploadImageApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_EndTrainingUploadImageApi', 'error', { ...error });
            // console.log(error.response.message);
            console.log(error.response.headers);
            console.log('_EndTrainingUploadImageApi', 'error.response.message', error.message);
            reject(error);
        }
    });


export const _GetDisplayApi = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/get-display');
            const { data } = response;
            console.log('_GetDisplayApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_GetDisplayApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_GetDisplayApi', 'error.response.message', error.message);
            reject(error);
        }
    });


export const _GetShopsApi = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/get-display-shop');
            const { data } = response;
            console.log('_GetShopsApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_GetShopsApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_GetShopsApi', 'error.response.message', error.message);
            reject(error);
        }
    });

export const _ForgotPasswordApi = (email) =>
    new Promise(async (resolve, reject) => {
        try {
            // console.log(email)
            const response = await Axios.post('/forgot-password', { email });
            const { data } = response;
            console.log('_ForgotPasswordApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            // console.log('_ForgotPasswordApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_ForgotPasswordApi', 'error.response.message', error.message);
            reject(error);
        }
    });

export const _GetDisplayGalleryApi = (type) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/display-gallery-all', { type });
            const { data } = response;
            console.log('_GetDisplayGalleryApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_GetDisplayGalleryApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_GetDisplayGalleryApi', 'error.response.message', error.message);
            reject(error);
        }
    });



export const _GetDisplayBrandListApi = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/get-branding');
            const { data } = response;
            console.log('_GetDisplayBrandListApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_GetDisplayBrandListApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_GetDisplayBrandListApi', 'error.response.message', error.message);
            reject(error);
        }
    });

export const _GetDisplayCompetitorListApi = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/get-competitors');
            const { data } = response;
            console.log('_GetDisplayCompetitorListApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_GetDisplayCompetitorListApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_GetDisplayCompetitorListApi', 'error.response.message', error.message);
            reject(error);
        }
    });


export const _SaveDisplayApi = (details) =>
    new Promise(async (resolve, reject) => {
        try {
            console.log("_SaveDisplayApi", { details });
            const response = await Axios.post('/save-display-shop', details);
            const { data } = response;
            console.log('_SaveDisplayApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_SaveDisplayApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_SaveDisplayApi', 'error.response.message', error.message);
            reject(error);
        }
    });

export const _UploadDisplayImageApi = (details) =>
    new Promise(async (resolve, reject) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        try {
            console.log("_UploadDisplayImageApi", details, "dsssssssssssss");
            const response = await Axios.post('/display-image-save', details, config
            );
            const { data } = response;
            console.log('_UploadDisplayImageApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_UploadDisplayImageApi', 'error', { ...error });
            // console.log(error.response.message);
            console.log(error.response.headers);
            console.log('_UploadDisplayImageApi', 'error.response.message', error.message);
            reject(error);
        }
    });

export const _GetMRPApi = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/all-categories');
            const { data } = response;
            console.log('_GetMRPApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_GetMRPApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_GetMRPApi', 'error.response.message', error.message);
            reject(error);
        }
    });


export const _GetMRPProductApi = (details) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/all-products', details);
            const { data } = response;
            console.log('_GetMRPProductApi', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_GetMRPProductApi', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_GetMRPProductApi', 'error.response.message', error.message);
            reject(error);
        }
    });


export const _GetWalletBalanceApi = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/wallet-balance');
            const { data } = response;
            console.log('_GetWalletBalance', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_GetWalletBalance', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_GetWalletBalance', 'error.response.message', error.message);
            reject(error);
        }
    });

export const _AskQuestion = (body) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Axios.post('/send-new-message', body);
            const { data } = response;
            console.log('_AskQuestion', 'response', data);
            setTimeout(() => {
                resolve(data);
            }, 3000)
        } catch (error) {
            console.log('_AskQuestion', 'error', { ...error });
            console.log(error.response.data);
            // console.log(error.response.headers);
            console.log('_AskQuestion', 'error.response.message', error.message);
            reject(error);
        }
    });

