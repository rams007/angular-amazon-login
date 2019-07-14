/// <reference path="typings/index.d.ts" />

import { Component, AfterViewInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

export class AmazonAuthResponse {
  public authRequest: amazon.Login.AuthorizeRequest;

  constructor(authRequest: amazon.Login.AuthorizeRequest) {
    this.authRequest = authRequest;
  }
}

@Component({
  selector: 'amazon-login',
  template: `
    <a id="LoginWithAmazon" (click)="onClick()">
    <img border="0" alt="Login with Amazon"
      src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png"
      width="156" height="32" />
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmazonLoginComponent implements AfterViewInit {

  private id: string = 'amazon-root';

  // Options
  @Input() private clientId: string;
  @Input() private scope: string | string[] = "profile";
  @Input() private popup: boolean = true;
  @Input() private redirectUrl: string = "";
  @Input() private responseType: "token" | "code" = "token";

  @Output() amazonAuthResponse: EventEmitter<AmazonAuthResponse> = new EventEmitter<AmazonAuthResponse>();

  ngAfterViewInit() {
    this.loginInit();
  }

  private loginInit() {
    if (this.clientId == null)
      throw new Error(
        'clientId property is necessary. (<amazon-login [clientId]="..."></amazon-login>)');

    amazon.Login.setClientId(this.clientId);
  }

  private handleResponse(response: amazon.Login.AuthorizeRequest) {
    this.amazonAuthResponse.next(new AmazonAuthResponse(response));
  }

  private onClick() {
    const next = this.popup ? (response: amazon.Login.AuthorizeRequest) => this.handleResponse(response) : this.redirectUrl;
    amazon.Login.authorize({
      scope: this.scope,
      popup: this.popup,
      response_type: this.responseType,
    }, next);
  }
}
