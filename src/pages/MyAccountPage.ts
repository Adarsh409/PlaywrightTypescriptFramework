import { Page } from '@playwright/test'
import { BasePage } from './BasePage';
import { Header } from './Header'

export class MyAccountPage extends BasePage
{
    readonly header: Header;

    constructor(page: Page)
    {
        super(page)
        this.header = new Header(page);
    }
}
