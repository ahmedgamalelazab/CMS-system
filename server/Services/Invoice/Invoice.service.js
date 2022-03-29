import { Invoice } from "../models/Invoice.model";

/**
 * @description : object returned with the promise { success: boolean, data: data object queried from mongoose driver}
 * @returns {Promise<object>}
 */
exports.getInvoices() = async function () {
    return new Promise(async (resolve, reject) => {
        try {
            if (dbConnectionState === dbConnected) {
                const data = [
                    new Invoice('2525', 'Ahmed', 'Alsaada', 'Mohamed', '10-10-2020', 2500, 'kkk'),
                    new Invoice('3525', 'Mohamed', 'Al7ozn', 'Sami', '10-2-2020', 200, 'mmm'),
                    new Invoice('4525', 'Ali', 'Alfara7', 'Menna', '10-3-2020', 500, 'kkk'),
                ]
                resolve({
                    success: true,
                    data: data
                })
            } else {
                reject(new Error('db is not connected'))
            }
        } catch (error) {
            reject(error)
        }
    })
}


/**
 * @param {string} invoiceId
 * @description : object returned with the promise { success: boolean, data: data object queried from mongoose driver}
 * @returns {Promise<object>}
 */
exports.getInvoiceById = async function (invoiceId) {
    return new Promise(async (resolve, reject) => {
        try {
            if (dbConnectionState === dbConnected) {
                const data =
                    new Invoice(invoiceId, 'Ahmed', 'Alsaada', 'Mohamed', '10-10-2020', 2500, 'kkk');

                resolve({
                    success: true,
                    data: data
                })
            } else {
                reject(new Error('db is not connected'))
            }
        } catch (error) {
            reject(error)
        }
    })
}


/**
 * @param {Invoice} invoice
 * @description : object returned with the promise { success: boolean, inserted: boolean, data: data object queried from mongoose driver}
 * @returns {Promise<object>}
 */
exports.createInvoice = async function (invoice) {
    return new Promise(async (resolve, reject) => {
        try {
            if (dbConnectionState === dbConnected) {
                let data = invoice;
                //     new Invoice({
                //     _id: request.body.id,
                //     doctorName: request.body.doctorName,
                //     clinicName: request.body.clinicName,
                //     patientName: request.body.patientName,
                //     createdAt: request.body.createdAt,
                //     totalPrice: request.body.totalPrice,
                //     paymentMethod: request.body.paymentMethod
                // });
                resolve({
                    success: true,
                    inserted: true,
                    data: data
                })
            } else {
                reject(new Error('db is not connected'))
            }
        } catch (error) {
            reject(error)
        }
    })
}

/**
 * @param {Invoice} invoice
 * @description : object returned with the promise { success: boolean, updated: boolean, data: data object queried from mongoose driver}
 * @returns {Promise<object>}
 */
exports.updateInvoice = async function (invoice) {
    return new Promise(async (resolve, reject) => {
        try {
            if (dbConnectionState === dbConnected) {
                let data = invoice;
                //     new Invoice({
                //     doctorName: request.body.doctorName,
                //     clinicName: request.body.clinicName,
                //     patientName: request.body.patientName,
                //     createdAt: request.body.createdAt,
                //     totalPrice: request.body.totalPrice,
                //     paymentMethod: request.body.paymentMethod
                // });
                resolve({
                    success: true,
                    updated: true,
                    data: data
                })
            } else {
                reject(new Error('db is not connected'))
            }
        } catch (error) {
            reject(error)
        }
    })
}

/**
 *  @param {string} invoiceId
 * @description : object returned with the promise { success: boolean, deleted: boolean, data: data object queried from mongoose driver}
 * @returns {Promise<object>}
 */
exports.deleteInvoice = async function (invoiceId) {
    return new Promise(async (resolve, reject) => {
        try {
            if (dbConnectionState === dbConnected) {
                let data = invoiceId;
                resolve({
                    success: true,
                    deleted: true,
                    data: data
                })
            } else {
                reject(new Error('db is not connected'))
            }
        } catch (error) {
            reject(error)
        }
    })
}