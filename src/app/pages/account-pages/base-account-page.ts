import { BaseAccount } from 'src/app/models/baseAccount';
import { BaseAccountService } from 'src/app/services/account-services/base-account.service';

export abstract class BaseAccountPage {

    public apiUrl: string;

    public accounts: BaseAccount[];

    public componentHeader: string;

    constructor(apiUrlForPage: string, componentHeader: string, protected accountService: BaseAccountService<BaseAccount>) {
        this.apiUrl = apiUrlForPage;
        this.componentHeader = componentHeader;
    }

    protected fetchAccounts(): void {
        this.accountService.getAccounts(this.apiUrl).subscribe(fetchedAccounts => this.accounts = fetchedAccounts);
    }

}
