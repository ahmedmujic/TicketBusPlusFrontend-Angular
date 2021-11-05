import { ERROR_CODES } from './../../core/enums/error-codes.enum';
import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivateUser } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss'],
})
export class ActivateAccountComponent implements OnInit {
  userId: string;
  token: string;
  err: boolean;
  isPending: boolean = false;
  alreadyActivated: boolean = false;
  successOprationDrawing = '../../../assets/images/activate.svg';
  failOperionDrawing = '../../../assets/images/cancel.svg';
  pendingDrawing = '../../../assets/images/pending.svg';

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.userId = params['userId'];
      this.token = params['token'];
    });

    this.authService
      .acivateAccount(new ActivateUser(this.userId, this.token))
      .subscribe(
        (_) => {
          this.err = false;
        },
        (err) => {
          this.err = true;
          this.alreadyActivated = false;
        }
      );
  }

  resendEmail() {
    this.authService.resendEmail(this.userId).subscribe(
      (_) => {
        this.err = false;
      },
      (err) => {
        if (err.error.errors[0].code == ERROR_CODES.ACCOUNT_ALREADY_CONFIRMED) {
          this.isPending = false;
          this.alreadyActivated = true;
          this.err = false;
        }
      }
    );
  }
}
