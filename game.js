//Initialize:
var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var pressed = false;
var game_ready = false
var game_end = false

$(document).keypress(function (event){
    if(!pressed && event.key === 'A' && game_ready === false)
    {
        setTimeout(function()
        {            
            nextSequence();
        }
        , 1000);
        $('#level-title').text('Level ' + String(level));
        pressed = true;
        game_ready = true;
    }
    else if(!game_ready && !game_end)
    {
        setTimeout(function()
        {            
            nextSequence();
        }
        , 1000);
        $('#level-title').text('Level ' + String(level));
        game_ready = true;
    }
}); 

$('.btn').on('click', function (event)
{   
    $(event.target).addClass('pressed');
    setTimeout(() => {
        $(event.target).removeClass('pressed');
    }, 50);
    playSound(event.target.id);
    if(game_ready)
    {
        userClickedPattern.push(event.target.id);
        checkAns();
    }
})

function playSound(btn)
{
    var audio = new Audio();
    audio.src = 'sounds/' + btn + '.mp3'
    audio.play();
}
function checkAns()
{
    cur_clicked = userClickedPattern.length - 1
    if(userClickedPattern[cur_clicked] != gamePattern[cur_clicked])
    {
        $('#level-title').text('You lost!');
        game_end = true;
        game_ready = false;
    }
    else
    {
        if(userClickedPattern.length === gamePattern.length)
        {
            $('#level-title').text('You won! Press any key to continue.');
            game_ready = false;
        }
    }
}
function Reset()
{
    userClickedPattern = [];
}
function nextSequence()
{
    Reset();
    level ++;
    var randomNumber = Math.ceil(Math.random() * 3);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
    
}

    

    