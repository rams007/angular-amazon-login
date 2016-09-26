# angular-amazon-login [![npm version](https://badge.fury.io/js/angular-amazon-login.svg)](https://badge.fury.io/js/angular-amazon-login)

Amazon Login component for Angular written in TypeScript.

## Usage

Add this script tag below in the head tag of ```index.html```:

```html
<script async src="https://api-cdn.amazon.com/sdk/login1.js"></script>
```

Import and add ```AmazonLoginComponent``` from this package to your Angular module:

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AmazonLoginComponent} from 'angular-amazon-login';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    AmazonLoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Example of a component that is using this package:

```typescript
import {Component} from '@angular/core';
import {AmazonAuthResponse} from 'angular-amazon-login';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor() {
  }

  private myClientId: string = 'your-client-id-here';

  onAmazonAuthResponse(event: AmazonAuthResponse) {
    // your code here
  }
}
```

In a component template, put `<amazon-login>` with attributes of render options and init params.
`clientId` attribute is **required**.

```html
<amazon-login
  [clientId]="myClientId"
  (amazonAuthResponse)="onAmazonAuthResponse($event)">
</amazon-login>
```

For more information about Login With Amazon SDK, see [http://login.amazon.com/documentation](http://login.amazon.com/documentation)

## Features and bugs

Please file feature requests and bugs at the [issue tracker][tracker].

[tracker]: https://github.com/miltador/angular-amazon-login/issues
