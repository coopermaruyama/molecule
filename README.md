# Molecule

**Note:** As of right now molecule does not have enough elements to be useful
in production. Unless you want to add to it I wouldn't recommend using this 
package until its' more developed.

Reactive UI viewmodel components for meteor, so you can focus on functionality.
It's pretty much like bootstrap, but rather than just the CSS, you get templates
with pre-integrated functionality. For example, to create a button which links
to one of your routes:

```html
<template name="myTemplate">
  <h1>My Webpage</h1>
  {{> UIButton buttonData}}
```

```js
Template.myTemplate.helpers({
  buttonData: {
    style: 'primary',
    buttonText: 'Click me',
    buttonAction: '/my-page' // also accepts a callback
  }
});
```

Molecules can be used with each other and can behave differently if so. For 
example to make a call to action:

```html
<template name="myTemplate">
  {{> CallToAction ctaData}}
</template>
```


```js
Template.myTemplate.helpers({
  ctaData: {
    title: 'Sign up Now!',
    message: 'Sign up now to get access to exclusive features!',
    buttonSize: 'large', // customize the button size
    buttons: [   //you can specify 1 button or an array of buttons
      {
        index: 0, //specify the order
        style: 'primary',
        buttonText: 'Sign up Now',
        buttonAction: '/signup'
      },
      {
        index: 1,
        style: 'secondary', // alternate stylings
        buttonText: 'More info',
        buttonAction: function() {
          Router.go('myRoute', {_id: 1}); // example using a callback
        }
      }
    ]
  }
});
```

In the above example, by passing button data to CallToAction, you are also
creating 2 UIButtons, as in the 1st example. Molecules can be used within
molecules, which changes their behavior. For example, in the above, by 
using an array of buttons, a button group will be shown rather than just 2
buttons next to each other, which demonstrates the power of molecule.


Currently included elements:
* CallToaction
* UIButton
