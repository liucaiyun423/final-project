/**
    The ApplicationManager is used to manage the application itself.
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
*/
function ApplicationManager()
{
    /**
        Initialises this object
        @return A reference to the initialised object
    */
    this.startupApplicationManager = function()
    {
        this.bounce = new Bounce().startupBounce(g_image);
        return this;
    }
}