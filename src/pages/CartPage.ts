import{Page,Locator} from '@playwright/test';
import {BasePage} from '../pages/BasePage'
export class CartPage extends BasePage{

    constructor(page:Page)
    {
        super(page);
    }
}