import {Container} from 'inversify';
import { interfaces, TYPE } from 'inversify-express-utils';

import TYPES from './type';
import { UserRepository } from './repository/user-repository';
import { IUserRepository } from './repository/Interface/IUserRepository';
import { IProductRepository } from './repository/Interface/IProductRepository';
import { ProductRepository } from './repository/product-repository';
import { ICartRepository } from './repository/Interface/ICartRepository';
import { CartRepository } from './repository/cart-repository';
import { IOrderRepository } from './repository/Interface/IOrderRepository';
import { OrderRepository } from './repository/order-repository';
import { INotificationRepository } from './repository/Interface/INotificationRepository';
import { NotificationRepository } from './repository/notification-repository';


const container = new Container();

container.bind<IUserRepository>(TYPES.UserRepository ).to(UserRepository).inSingletonScope();
container.bind<IProductRepository>(TYPES.ProductRepository ).to(ProductRepository).inSingletonScope();
container.bind<ICartRepository>(TYPES.CartRepository ).to(CartRepository).inSingletonScope();
container.bind<IOrderRepository>(TYPES.OrderRepository ).to(OrderRepository).inSingletonScope();
container.bind<INotificationRepository>(TYPES.NotificationRepository ).to(NotificationRepository).inSingletonScope();
export default container;