import { Environment, Paddle } from '@paddle/paddle-node-sdk-dynamic-import';

export interface Env {
	PADDLE_API_KEY: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const paddle = new Paddle(env.PADDLE_API_KEY, {
			environment: Environment.sandbox,
		});

		const productCollection = paddle.products.list();
		const firstPage = await productCollection.next();
		console.log('First page:', firstPage);

		return new Response(
			JSON.stringify({
				firstPage,
			})
		);
	},
};
