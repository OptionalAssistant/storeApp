import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Product } from "src/product/entities/product.entity";
import Stripe from "stripe";

@Injectable()
export class StripeService{
    private stripe;
    constructor(private configService: ConfigService){
        this.stripe = new Stripe(configService.getOrThrow<string>('STRIPE_SECRET_KEY'));
    }

    async payment(product : Product){
        const session = await this.stripe.checkout.sessions.create({
            line_items:[{
                price_data:{
                    currency: 'usd',
                    product_data:{name: `${product.name}`},
                    unit_amount: product.price * 100
                },
                quantity:1
            }],
            mode: 'payment',
            success_url:`${this.configService.getOrThrow('BASE_URL')}stripe/complete`,
            cancel_url:`${this.configService.getOrThrow('BASE_URL')}`
        }) 

        return session;
    }
}