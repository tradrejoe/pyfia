package com.uxl.sites.pyfia.model.fin.exceptions;

public class NegativeLagException
  extends RuntimeException
{
  public NegativeLagException() {}
  
  public NegativeLagException(String arg0)
  {
    super(arg0);
  }
  
  public NegativeLagException(Throwable arg0)
  {
    super(arg0);
  }
  
  public NegativeLagException(String arg0, Throwable arg1)
  {
    super(arg0, arg1);
  }
  
  public String getMessage()
  {
    return "Lag must be positive in the number of days.";
  }
}
