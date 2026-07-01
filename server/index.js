import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'

import connectDB from './config/connectDB.js'

import userRouter from './route/user.route.js'
import categoryRouter from './route/category.route.js'
import uploadRouter from './route/upload.router.js'
import subCategoryRouter from './route/subCategory.route.js'
import productRouter from './route/product.route.js'
import cartRouter from './route/cart.route.js'
import addressRouter from './route/address.route.js'
import orderRouter from './route/order.route.js'

const app = express()

// ===============================
// Middleware
// ===============================
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL
    })
)

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

app.use(
    helmet({
        crossOriginResourcePolicy: false
    })
)

// ===============================
// Port
// ===============================
const PORT = process.env.PORT || 8080

// ===============================
// Default Route
// ===============================
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: `🚀 Server is running on port ${PORT}`
    })
})

// ===============================
// Health Check Route
// Used by Docker & Kubernetes
// ===============================
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        status: 'UP',
        message: 'Backend is healthy'
    })
})

// ===============================
// API Routes
// ===============================
app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/file', uploadRouter)
app.use('/api/subcategory', subCategoryRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)

// ===============================
// Database Connection
// ===============================
connectDB()
    .then(() => {
        console.log('✅ MongoDB Connected Successfully')

        app.listen(PORT, () => {
            console.log('===================================')
            console.log(`🚀 Server Started Successfully`)
            console.log(`🌐 Port      : ${PORT}`)
            console.log(`🌍 Environment : ${process.env.NODE_ENV || 'development'}`)
            console.log('===================================')
        })
    })
    .catch((error) => {
        console.error('===================================')
        console.error('❌ Failed to connect to MongoDB')
        console.error(error)
        console.error('===================================')

        process.exit(1)
    })
