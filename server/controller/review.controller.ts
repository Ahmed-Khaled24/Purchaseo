import { Request, Response } from 'express';
import { Review } from '../types/Review';
import {
	dbAddNewReview,
	dbDeleteReviewByCustomerIdAndProductId,
	dbGetReviewsByCustomerId,
	dbGetReviewsByCustomerIdAndProductId,
	dbGetReviewsByProductId,
} from '../model/review.model';
import ErrorWithStatusCode from '../util/classes/ErrorWithStatusCode';

export async function addNewReview(req: Request, res: Response) {
	const review: Review = req.body;
	try {
		const addedReview = await dbAddNewReview(review);
		res.status(201).json({ status: 'success', data: addedReview });
	} catch (error) {
		res.status((error as ErrorWithStatusCode).statusCode || 500).json({
			status: 'failure',
			data: (error as Error).message,
		});
	}
}

export async function getProductReviews(req: Request, res: Response) {
	const { productId } = req.params;
	try {
		const reviews = await dbGetReviewsByProductId(productId);
		res.status(200).json({ status: 'success', data: reviews });
	} catch (error) {
		res.status((error as ErrorWithStatusCode).statusCode || 500).json({
			status: 'failure',
			data: (error as Error).message,
		});
	}
}

export async function getCustomerReviews(req: Request, res: Response) {
	const { customerId } = req.params;
	try {
		const reviews = await dbGetReviewsByCustomerId(customerId);
		res.status(200).json({ status: 'success', data: reviews });
	} catch (error) {
		res.status((error as ErrorWithStatusCode).statusCode || 500).json({
			status: 'failure',
			data: (error as Error).message,
		});
	}
}

export async function getSpecificReview(req: Request, res: Response) {
	const { productId, customerId } = req.query;
	try {
		const reviews = await dbGetReviewsByCustomerIdAndProductId(
			productId as string,
			customerId as string
		);
		res.status(200).json({ status: 'success', data: reviews });
	} catch (error) {
		res.status((error as ErrorWithStatusCode).statusCode || 500).json({
			status: 'failure',
			data: (error as Error).message,
		});
	}
}

export async function deleteSpecificReview(req: Request, res: Response) {
	const { productId, customerId } = req.query;
	try {
		const reviews = await dbDeleteReviewByCustomerIdAndProductId(
			productId as string,
			customerId as string
		);
		res.status(200).json({ status: 'success', data: reviews });
	} catch (error) {
		res.status((error as ErrorWithStatusCode).statusCode || 500).json({
			status: 'failure',
			data: (error as Error).message,
		});
	}
}
