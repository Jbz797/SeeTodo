# SeeTodo *v1.0*
Gestionnaire de liste des tâches pour appareils android et ios.
- [Documentation utilisateurs](https://github.com/Jbz797/SeeTodo/blob/master/doc/documentation.md)

## Réalisé avec les technologies suivantes
- [AngularJS](https://angularjs.org/)
- [Bower](http://bower.io/)
- [Gulp](http://gulpjs.com/)
- [Ionic](http://ionicframework.com/)
- [IonicMaterial](http://http://ionicmaterial.com/)
- [Karma](http://karma-runner.github.io)
- [Sass](http://sass-lang.com/)

## Installation
#### Installer les outils `ionic` et `cordova` :
```
npm install -g ionic cordova
```
Pour le développement : `npm install -g gulp`
#### Cloner le projet :
```
git clone https://github.com/Jbz797/SeeTodo.git
```

## Emulation
#### Aller dans le projet :
```
cd SeeTodo
```
#### Construire les plateformes et modules :
```
ionic platform add ios
ionic platform add android
npm install
```
#### Tester l'application dans son navigateur :
```
npm install -g ripple-emulator
ripple emulate
```
#### Tester l'application depuis son appareil Android :
```
ionic run android
```

## Tests unitaires
```
npm test
```
