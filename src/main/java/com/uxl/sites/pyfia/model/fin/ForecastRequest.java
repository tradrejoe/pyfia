package com.uxl.sites.pyfia.model.fin;

import java.util.ArrayList;
import java.util.Date;

import com.uxl.sites.pyfia.model.fin.exceptions.NegativeLagException;
import com.uxl.sites.pyfia.model.fin.exceptions.NoPredictorsException;

import weka.core.Attribute;

public class ForecastRequest
  implements IForecastRequest
{
  public static final long serialVersionUID = 0L;
  String cls;
  String attr;
  Date dt;
  Integer rng;
  String requestId;
  String target;
  public static final int DEFAULT_HISTORY = 504;
  
  public String getTarget()
  {
    return this.target;
  }
  
  public void setTarget(String target)
  {
    this.target = target;
  }
  
  private int history = 504;
  
  public int getHistory()
  {
    return this.history;
  }
  
  public void setHistory(int history)
  {
    this.history = history;
  }
  
  public boolean isSd()
  {
    return this.sd;
  }
  
  public void setSd(boolean sd)
  {
    this.sd = sd;
  }
  
  private boolean sd = true;
  
  public String getClazz()
  {
    return this.cls;
  }
  
  public void setClazz(String cls)
  {
    this.cls = cls;
  }
  
  public String getAttributes()
  {
    return this.attr;
  }
  
  public ArrayList<Attribute> getAttributesWeka() {
	  ArrayList<Attribute> out = new ArrayList<Attribute>();
	  String[] strattr = this.attr.split(",");
	  for (String a : strattr) {
		  out.add(new Attribute(a));
	  }
	  out.add(new Attribute("class"));
	  return out;
  }
  public void setAttributes(String attr)
  {
    this.attr = attr;
  }
  
  public Date getCase()
  {
    return this.dt;
  }
  
  public void setCase(Date dt)
  {
    this.dt = dt;
  }
  
  public Integer getForecastRange()
  {
    return this.rng;
  }
  
  public void setForecastRange(Integer rng)
  {
    this.rng = rng;
  }
  
  public ForecastRequest() {}
  
  public String getRequestId()
  {
    return this.requestId;
  }
  
  public void setRequestId(String requestId)
  {
    this.requestId = requestId;
  }
  
  public ForecastRequest(String cls, String attrib, Date dt, Integer rng, Integer history, Boolean sd, String target)
  {
    if (rng.intValue() < 0) {
      throw new NegativeLagException();
    }
    if ((attrib == null) || (attrib.trim().equals(""))) {
      throw new NoPredictorsException("No predictors specified for " + cls + ".");
    }
    this.attr = attrib;
    this.rng = rng;
    this.cls = cls;
    this.dt = dt;
    this.history = history.intValue();
    this.sd = sd.booleanValue();
    this.target = target;
  }
  
  public FincastResponse prepareResponse()
  {
    FincastResponse response = new FincastResponse();
    response.setCaseTest(getCase());
    response.setClazz(getClazz());
    response.setForecastRange(getForecastRange());
    response.setRequestId(getRequestId());
    response.setHistory(getHistory());
    response.setSd(isSd());
    response.setTarget(getTarget());
    return response;
  }
}
