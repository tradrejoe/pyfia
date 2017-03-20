package com.uxl.sites.pyfia.model.fin;

import java.io.Serializable;
import java.util.Date;

public abstract interface IForecastRequest
  extends Serializable
{
  public abstract String getClazz();
  
  public abstract void setClazz(String paramString);
  
  public abstract String getAttributes();
  
  public abstract void setAttributes(String paramString);
  
  public abstract Date getCase();
  
  public abstract void setCase(Date paramDate);
  
  public abstract Integer getForecastRange();
  
  public abstract void setForecastRange(Integer paramInteger);
  
  public abstract String getRequestId();
  
  public abstract void setRequestId(String paramString);
  
  public abstract String getTarget();
  
  public abstract void setTarget(String paramString);
}
