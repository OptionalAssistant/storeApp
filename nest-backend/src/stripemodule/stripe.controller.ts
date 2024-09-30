import { Body, Controller, Post,Res ,Redirect} from "@nestjs/common";
import { StripeService } from "./stripe.service";
import { Product } from "src/product/entities/product.entity";
import { Response } from "express";

@Controller('stripe')
export class StripeController{

    constructor(private stripeService : StripeService){}

    @Post('checkout')
    async checkout(@Body() product: Product,@Res() responce: Response) {
      const session = await this.stripeService.payment(product);
      return responce.send({url : session.url});
    }
}