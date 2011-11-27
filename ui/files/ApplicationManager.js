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
		this.background3 = new RepeatingGameObject().startupRepeatingGameObject(g_back2, 0, 100, 3, 600, 320, 1);
        this.background2 = new RepeatingGameObject().startupRepeatingGameObject(g_back1, 0, 100, 2, 600, 320, 0.75);
        this.background = new RepeatingGameObject().startupRepeatingGameObject(g_back0, 0, 0, 1, 600, 320, 0.5);
        this.runner = new Player().startupPlayer();
        return this;
    }
}