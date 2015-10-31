# 2048

[Live link][live]

[live]: http://noahwiener.github.io/2048/

## Summary

How to play: Use your keyboard's arrow keys or your phone/tablet's swipe gestures to slide all of the tiles up, down, left, or right.  If two tiles with the same number collide, they combine and double in value! Keep moving and matching tiles until you hit 2048!


This game was created by [Noah Wiener][profile] using Javascript, jQuery, HTML, and CSS, featuring [Matt Bryson's jQuery TouchSwipe plugin][plugin] for mobile support. [Check out some of Noah's other work here][profile].  This page is an adaptation of [Gabriele Cirulli][original]'s original 2048 game.

[profile]: http://noahwiener.github.io/
[plugin]: https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
[original]: https://gabrielecirulli.github.io/2048/

## Features

### Mobile Friendly

I play 2048 all the time, but rarely on the computer. It is a great game to play on BART, while waiting in line, or whenever you have a few minutes to spare!  As a result, I decided to create a mobile-friendly version that you can play right in your phone or tablet's browser. Swipe gesture functionality added with jQuery, using [Matt Bryson's jQuery TouchSwipe plugin][plugin].

[plugin]: https://github.com/mattbryson/TouchSwipe-Jquery-Plugin

### Visual Effects

In order to render tiles sliding across the board, each tile is given its own CSS class and is rendered as an individual DOM element.

## Check it out!

<img src="https://i.gyazo.com/2dec25cb5ae3544d3a9a7e2676459cd5.gif" height="200" alt="gameplay-gif">
