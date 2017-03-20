package com.uxl.sites.pyfia.model.fin.exceptions;

public class NoPredictorsException
  extends RuntimeException
{
  public NoPredictorsException() {}
  
  public NoPredictorsException(String message)
  {
    super(message);
  }
  
  public NoPredictorsException(Throwable cause)
  {
    super(cause);
  }
  
  public NoPredictorsException(String message, Throwable cause)
  {
    super(message, cause);
  }
}
