/**
    A test class to demonstrate the use of the VisualGameObject class
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
*/
function Bounce()
{
	/** The movement direction  in the x axis
        @type Number
    */
	this.xDirection = 1;
	/** The movement direction  in the x axis
        @type Number
    */
	this.yDirection = 1;
	/** The movement speed
        @type Number
    */
	this.speed = 10;
	
	/**
        Initialises this object
        @return A reference to the initialised object
    */
	this.startupBounce = function(image)
	{
		this.startupVisualGameObject(image, 0, 0, 0);
		return this;
	}
	
	/**
        Updates the object
        @param dt The time since the last frame in seconds
        @param context The drawing context 
        @param xScroll The global scrolling value of the x axis  
        @param yScroll The global scrolling value of the y axis 
    */
	this.update = function (/**Number*/ dt, /**CanvasRenderingContext2D*/context, /**Number*/ xScroll, /**Number*/ yScroll)
	{
		this.x += dt * this.speed * this.xDirection;
		this.y += dt * this.speed * this.yDirection;
		
		if (this.x >= 450)
		{
			this.x = 450;
			this.xDirection = -1;
		}
		else if (this.x <= 0)
		{
			this.x = 0;
			this.xDirection = 1;
		}
		
		if (this.y >= 250)
		{
			this.y = 250;
			this.yDirection = -1;
		}
		else if (this.y <= 0)
		{
			this.y = 0;
			this.yDirection = 1;
		}
	}
}
Bounce.prototype = new VisualGameObject;