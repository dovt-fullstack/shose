import 'dotenv/config.js';

import cors from 'cors';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import orderRoute from './routes/orderRoute.js';
import paymentRouter from './routes/payment.router.js';
import routerAddress from './routes/address.js';
import routerCart from './routes/cart.js';
import routerCategory from './routes/category.js';
import routerColor from './routes/color.js';
import routerComment from './routes/comment.js';
import routerContact from './routes/contact.js';
import routerCustomer from './routes/customer.js';
import routerFavoriteProduct from './routes/favoriteProduct.js';
import routerImageProduct from './routes/imageProduct.js';
import routerInformation from './routes/information.js';
import routerNews from './routes/tb_new.js';
import routerPayment from './routes/vnpay.router.js';
import routerProduct from './routes/product.js';
import routerRole from './routes/role.js';
import routerSize from './routes/size.js';
import routerUser from './routes/user.js';
import routerWarehose from './routes/warehose.js';
import routerimage_news from './routes/image_news.js';
import saleRouter from './routes/sale.router.js';
import checkoutVnpay from './controllers/vnpay.js';
import routeranalytics from './routes/anilytic.js';

//config
const app = express();
const API_DB = process.env.API_DB;
// middleware
app.use(cors());
app.use(express.json());
// router
app.use('/api', routerCategory);
app.use('/api', routerContact);
app.use('/api', routerInformation);
app.use('/api', routerCart);
app.use('/api', routerFavoriteProduct);
app.use('/api', routerComment);
app.use('/api', routerAddress);
app.use('/api', routerNews);
app.use('/api', routerRole);
app.use('/api', orderRoute);
app.use('/api', routerNews);
app.use('/api', routerimage_news);
app.use('/api', routerImageProduct);
app.use('/api', routerPayment);
app.use('/api/payments', paymentRouter);
app.use('/api/sales', saleRouter);
app.use('/api', routerProduct);
app.use('/api', routerUser);
app.use('/api', routerSize);
app.use('/api', routerColor);
app.use('/api', routerCustomer);
app.use('/api', routerWarehose);
app.use('/api', routeranalytics);
app.post('/create-checkout-vnpay', checkoutVnpay.payment);
// database config
mongoose
	.connect(API_DB)
	.then(() => {
		console.log('Database connected');
	})
	.catch(() => {
		console.log('Database connect failed');
	});
export const server = http.createServer(app);
// export const viteNodeApp = app;
server.listen(8080, (req, res) => {
	try {
		console.log('User Agent:');
	} catch (error) {
		console.log(error);
	}
	console.log(`Server is running on 8080 ${8080} `);
});
