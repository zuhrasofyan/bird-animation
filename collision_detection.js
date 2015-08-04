// http://api.jquery.com/animate/
jQuery(document).ready(function() {    
    // Cache DOM Items
    var ball     = jQuery("#ball");
    var ballSize = {
        height: ball.height(),
        width : ball.width()
    };
    
    var boss     = jQuery("#boss");
    var bossSize = {
        height: boss.height(),
        width : boss.width()
    };
    
    var explosion = jQuery("#explosion");
   
    // Generate Random Range (for speed & direction)
    function randomMinMax(min, max) {
        return Math.floor(min + (1 + max- min) * Math.random());
    }
    
    // Collision Testing
    // item1 position & item1 size
    // item2 position & item2 size
    function testCollision(position1, size1, position2, size2) {
        if (((position1.left + size1.width)  > position2.left) &&
            ((position1.top  + size1.height) > position2.top)  &&
            ((position2.left + size2.width)  > position1.left) &&
            ((position2.top  + size2.height) > position1.top)) {
            
            // BadaBoom !
            triggerExplosion(position1.top, position1.left);
        }
    }
    
    
    // Explosion Animation
    var explosionInProgress = false;
    function triggerExplosion(top, left) {
        if (!explosionInProgress) {
            explosionInProgress = true;
    
            explosion
                .css({ top: top, left: left })
                .show(300)
                .hide(100, function() {
                    explosionInProgress = false;
                    boss.css({ "opacity": 1 });
            });
        }
    }
    
    // Loop Ball Animation
    function animateBall() {
        var top   = randomMinMax(50 , 250);
        var left  = randomMinMax(0  , 460);
        var speed = randomMinMax(500, 2000);

        // 1) Animate Ball
        ball.animate({ top: top, left: left }, {
            duration: speed,
            step    : function(now, fx) {
                testCollision(ball.position(), ballSize, boss.position(), bossSize);
            },
            queue   : false,
            complete: animateBall
        });        
    }
    
    // Loop Boss Animation    
    function animateBoss() {
        var top   = randomMinMax(125 , 235);
        var left  = randomMinMax(0   , 390);    
        var speed = randomMinMax(1000, 3000);
        
        // 2) Animate Boss
        boss.animate({ top: top, left: left }, {
            duration: speed,
            queue   : false,
            complete: animateBoss
        });
    }
    
    // Start Animations
    animateBall();
    animateBoss();
});

