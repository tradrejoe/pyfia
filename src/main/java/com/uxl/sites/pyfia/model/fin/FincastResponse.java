package com.uxl.sites.pyfia.model.fin;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TreeMap;
import java.util.TreeSet;

import org.lc.misc.DateUtils;
import org.lc.model.CorrGraphLink;

public class FincastResponse
{
  public static final long serialVersionUID = 0L;
  public static final String STATUS_DEFAULT = "Processing.";
  public static final String STATUS_DONE = "Done.";
  private ArrayList<String> attributesList = new ArrayList();
  private String clazz;
  private Date caseTest = DateUtils.getDateNotime();
  private ArrayList<Date> cases = new ArrayList();
  private ArrayList<String> casesStr = new ArrayList();
  private ArrayList<Double> testData = new ArrayList();
  private ArrayList<ArrayList<Double>> trainingData = new ArrayList();
  private TreeSet<Double> uniqueValues = new TreeSet();
  private TreeMap<String, Double> scores = new TreeMap();
  private TreeMap<String, String> network = new TreeMap();
  private Double prediction = Double.valueOf(0.0D);
  private String predictionString = "";
  private Integer rng;
  private String status = "Processing.";
  private String requestId = "request";
  private ArrayList<Double> caseValues = new ArrayList();
  private int predictionLabel = 1;
  private double predictionProb = 0.0D;
  private String modelstring = "";
  private String target;
  private String exception;
  private double curVal = 0.0D;
  private double predVal = 0.0D;
  public static final int DEFAULT_HISTORY = 504;
  private List<CorrGraphLink> corrGraphLinks = null;
  private ArrayList<Double> caseValuesO = new ArrayList<Double>();
  private ArrayList<Double> caseValuesH = new ArrayList<Double>();
  private ArrayList<Double> caseValuesL = new ArrayList<Double>();
  private ArrayList<Double> caseValuesSD = new ArrayList<Double>();
  
  public ArrayList<Double> getCaseValuesO() {
	return caseValuesO;
}

public void setCaseValuesO(ArrayList<Double> caseValuesO) {
	this.caseValuesO = caseValuesO;
}

public ArrayList<Double> getCaseValuesH() {
	return caseValuesH;
}

public void setCaseValuesH(ArrayList<Double> caseValuesH) {
	this.caseValuesH = caseValuesH;
}

public ArrayList<Double> getCaseValuesL() {
	return caseValuesL;
}

public void setCaseValuesL(ArrayList<Double> caseValuesL) {
	this.caseValuesL = caseValuesL;
}

public ArrayList<Double> getCaseValuesSD() {
	return caseValuesSD;
}

public void setCaseValuesSD(ArrayList<Double> caseValuesSD) {
	this.caseValuesSD = caseValuesSD;
}

public void setPrediction(Double prediction) {
	this.prediction = prediction;
}

public void setPredictionProb(double predictionProb) {
	this.predictionProb = predictionProb;
}

public List<CorrGraphLink> getCorrGraphLinks() {
	return corrGraphLinks;
}

public void setCorrGraphLinks(List<CorrGraphLink> corrGraphLinks) {
	this.corrGraphLinks = corrGraphLinks;
}

public double getCurVal()
  {
    return this.curVal;
  }
  
  public void setCurVal(double curVal)
  {
    this.curVal = curVal;
  }
  
  public double getPredVal()
  {
    return Math.round(this.predVal * 100.0) / 100.0;
  }
  
  public void setPredVal(double predVal)
  {
    this.predVal = predVal;
  }
  
  public String getException()
  {
    return this.exception;
  }
  
  public void setException(String exception)
  {
    this.exception = exception;
  }
  
  public Integer getRng()
  {
    return this.rng;
  }
  
  public void setRng(Integer rng)
  {
    this.rng = rng;
  }
  
  public int getPredictionLabel()
  {
    return this.predictionLabel;
  }
  
  public Double getPredictionProb()
  {
    return Double.valueOf(this.predictionProb);
  }
  
  public String getClazz()
  {
    return this.clazz;
  }
  
  public void setClazz(String clazz)
  {
    this.clazz = clazz;
  }
  
  public String getStatus()
  {
    return this.status;
  }
  
  public void setStatus(String status)
  {
    this.status = status;
  }
  
  public ArrayList<String> getCasesStr()
  {
    return this.casesStr;
  }
  
  public void setCasesStr(ArrayList<String> casesStr)
  {
    this.casesStr = casesStr;
  }
  
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
  public static final String SEP_TAB = "\t";
  
  public String getModelstring()
  {
    return this.modelstring;
  }
  
  public void setModelstring(String modelstring)
  {
    this.modelstring = modelstring;
  }
  
  public ArrayList<Double> getCaseValues()
  {
    return this.caseValues;
  }
  
  public void setCaseValues(ArrayList<Double> caseValues)
  {
    this.caseValues = caseValues;
  }
  
  public TreeSet<Double> getUniqueValues()
  {
    return this.uniqueValues;
  }
  
  public void setUniqueValues(TreeSet<Double> uniqueValues)
  {
    this.uniqueValues = uniqueValues;
  }
  
  public TreeMap<String, Double> getScores()
  {
    return this.scores;
  }
  
  public void setScores(TreeMap<String, Double> scores)
  {
    this.scores = scores;
  }
  
  public TreeMap<String, String> getNetwork()
  {
    return this.network;
  }
  
  public void setNetwork(TreeMap<String, String> network)
  {
    this.network = network;
  }
  
  public Double getPrediction()
  {
    return this.prediction;
  }
  
  public String getPredictionString()
  {
    return this.predictionString;
  }
  
  public void setPredictionString(String predictionString)
  {
    this.predictionString = predictionString;
    if (this.predictionString != null)
    {
      this.predictionString = this.predictionString.replace("\n", "");
      this.predictionString = this.predictionString.replace("\r", "");
    }
  }
  
  public ArrayList<String> getAttributesList()
  {
    return this.attributesList;
  }
  
  public void setAttributesList(ArrayList<String> attributes)
  {
    this.attributesList = attributes;
  }
  
  public Date getCaseTest()
  {
    return this.caseTest;
  }
  
  public void setCaseTest(Date caseTest)
  {
    this.caseTest = caseTest;
  }
  
  public ArrayList<Date> getCases()
  {
    return this.cases;
  }
  
  public void setCases(ArrayList<Date> cases)
  {
    this.cases = cases;
  }
  
  public ArrayList<Double> getTestData()
  {
    return this.testData;
  }
  
  public void setTestData(ArrayList<Double> testData)
  {
    this.testData = testData;
  }
  
  public ArrayList<ArrayList<Double>> getTrainingData()
  {
    return this.trainingData;
  }
  
  public void setTrainingData(ArrayList<ArrayList<Double>> trainingData)
  {
    this.trainingData = trainingData;
  }
  
  public Integer getForecastRange()
  {
    return this.rng;
  }
  
  public void setForecastRange(Integer rng)
  {
    this.rng = rng;
  }
  
  public String getRequestId()
  {
    return this.requestId;
  }
  
  public void setRequestId(String requestId)
  {
    this.requestId = requestId;
  }
  
  public void setPredictionLabel(int label)
  {
    this.predictionLabel = label;
  }
  
  public void setPredictionProb(Double prob)
  {
    this.predictionProb = prob.doubleValue();
  }
  
  public String toStringDelim(String... sep)
  {
    String s = sep[0];
    String buf = this.clazz + s + this.target + s + this.predictionString;
    return buf;
  }
  
  public CCsvRec getCsvRec()
  {
    return new CCsvRec(this.clazz, this.rng.intValue(), this.predictionLabel + "", 
    		this.predictionProb, this.predictionString, this.getCurVal(), this.getPredVal());
  }
  
  public static class CCsvRec
  {
    String clazz;
    int rng;
    String predictedLabel;
    double predictionProb;
    String predictionString;
    double curVal;
    double predVal;
    
    public double getCurVal() {
		return curVal;
	}

	public void setCurVal(double curVal) {
		this.curVal = curVal;
	}

	public double getPredVal() {
		return predVal;
	}

	public void setPredVal(double predVal) {
		this.predVal = predVal;
	}

	public String getPredictionString()
    {
      return this.predictionString;
    }
    
    public void setPredictionString(String predictionString)
    {
      this.predictionString = predictionString;
    }
    
    private String sep = ",";
    
    public String getSep()
    {
      return this.sep;
    }
    
    public void setSep(String sep)
    {
      this.sep = sep;
    }
    
    public CCsvRec() {}
    
    public CCsvRec(String clazz, int rng, String predictedLabel, double predictionProb, 
    		String predictionString, double curVal, double predVal)
    {
      this.clazz = clazz;
      this.rng = rng;
      this.predictedLabel = predictedLabel;
      this.predictionProb = predictionProb;
      this.predictionString = predictionString;
      this.curVal = curVal;
      this.predVal = predVal;
    }
    
    public String toCsvRec()
    {
      String buf = "";
      buf = buf + this.clazz + this.sep + this.rng + this.sep + this.predictedLabel + this.sep + 
    		  this.predictionProb + this.sep + this.predictionString +this.sep + this.curVal + this.sep + this.predVal+ "\n";
      return buf;
    }
    
    public String getCsvRecNoSymbolHeader() {
    	return "pstr" + this.rng + this.sep + 
    			"cval" + this.rng + this.sep + 
    			"pval" + this.rng;
    }
    
    public String toCsvRecNoSymbol()
    {
      return this.predictionString + this.sep + this.curVal + this.sep + this.predVal;
    }
    
    public String getClazz()
    {
      return this.clazz;
    }
    
    public void setClazz(String clazz)
    {
      this.clazz = clazz;
    }
    
    public int getRng()
    {
      return this.rng;
    }
    
    public void setRng(int rng)
    {
      this.rng = rng;
    }
    
    public String getPredictedLabel()
    {
      return this.predictedLabel;
    }
    
    public void setPredictedLabel(String predictedLabel)
    {
      this.predictedLabel = predictedLabel;
    }
    
    public double getPredictionProb()
    {
      return this.predictionProb;
    }
    
    public void setPredictionProb(double predictionProb)
    {
      this.predictionProb = predictionProb;
    }
  }
  
  public String toString(String... sep)
  {
    if ((sep != null) && (sep.length > 0)) {
      return toStringDelim(sep);
    }
    SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");
    String buf = "";
    if ((this.clazz != null) && (!this.clazz.trim().equals(""))) {
      buf = buf + "'clazz':'" + this.clazz + "'";
    }
    if (this.target != null)
    {
      if (!buf.equals("")) {
        buf = buf + ",\n";
      }
      buf = buf + "'target':'" + this.target + "',";
    }
    if (this.cases != null)
    {
      if (!buf.equals("")) {
        buf = buf + ",\n";
      }
      buf = buf + "'cases':[";
      for (int c = 0; c < this.cases.size(); c++) {
        buf = buf + "'" + format.format((Date)this.cases.get(c)) + "',";
      }
      buf = buf + "'" + format.format(this.caseTest) + "']";
    }
    if (this.caseValues != null)
    {
      if (!buf.equals("")) {
        buf = buf + ",\n";
      }
      buf = buf + "'caseValues':[";
      for (int c = 0; c < this.caseValues.size() - 1; c++) {
        buf = buf + this.caseValues.get(c) + ",";
      }
      if (this.caseValues.size() > 0) {
        buf = buf + (Double)this.caseValues.get(this.cases.size() - 1);
      }
      buf = buf + "]";
    }
    if (this.testData != null)
    {
      if (!buf.equals("")) {
        buf = buf + ",\n";
      }
      buf = buf + "'testData':[";
      for (int c = 0; c < this.testData.size() - 1; c++) {
        buf = buf + this.testData.get(c) + ",";
      }
      if (this.testData.size() > 0) {
        buf = buf + (Double)this.testData.get(this.testData.size() - 1);
      }
      buf = buf + "]";
    }
    if (this.trainingData != null)
    {
      if (!buf.equals("")) {
        buf = buf + ",\n";
      }
      buf = buf + "'trainingData':[";
      for (int r = 0; r < this.trainingData.size() - 1; r++)
      {
        ArrayList<Double> row = (ArrayList)this.trainingData.get(r);
        buf = buf + "\n[";
        for (int c = 0; c < row.size() - 1; c++) {
          buf = buf + row.get(c) + ",";
        }
        if (row.size() > 0) {
          buf = buf + (Double)row.get(row.size() - 1);
        }
        buf = buf + "],";
      }
      if (this.trainingData.size() > 0)
      {
        ArrayList<Double> row = (ArrayList)this.trainingData.get(this.trainingData.size() - 1);
        buf = buf + "\n[";
        for (int c = 0; c < row.size() - 1; c++) {
          buf = buf + row.get(c) + ",";
        }
        if (row.size() > 0) {
          buf = buf + (Double)row.get(row.size() - 1);
        }
        buf = buf + "]";
      }
      buf = buf + "]";
    }
    if (this.uniqueValues != null)
    {
      if (!buf.equals("")) {
        buf = buf + ",\n";
      }
      buf = buf + "'uniqueValues':[";
      for (Double d : this.uniqueValues) {
        buf = buf + d + ",";
      }
      if (buf.endsWith(",")) {
        buf = buf.substring(0, buf.length() - 1);
      }
      buf = buf + "]";
    }
    if (this.scores != null)
    {
      if (!buf.equals("")) {
        buf = buf + ",\n";
      }
      buf = buf + "'scores':{";
      for (String key : this.scores.keySet()) {
        buf = buf + "'" + key + "':" + this.scores.get(key) + ",";
      }
      if (buf.endsWith(",")) {
        buf = buf.substring(0, buf.length() - 1);
      }
      buf = buf + "}";
    }
    if (this.network != null)
    {
      if (!buf.equals("")) {
        buf = buf + ",\n";
      }
      buf = buf + "'network':{";
      for (String key : this.network.keySet()) {
        buf = buf + "'" + key + "':'" + (String)this.network.get(key) + "',";
      }
      if (buf.endsWith(",")) {
        buf = buf.substring(0, buf.length() - 1);
      }
      buf = buf + "}";
    }
    if (this.prediction != null)
    {
      if (!buf.equals("")) {
        buf = buf + ",\n";
      }
      buf = buf + "'prediction':" + this.prediction;
    }
    if (this.caseTest != null)
    {
      if (!buf.equals("")) {
        buf = buf + ",";
      }
      buf = buf + "'caseTest':'" + format.format(this.caseTest) + "'";
    }
    if (this.predictionString != null)
    {
      if (!buf.equals("")) {
        buf = buf + ",";
      }
      buf = buf + "'predictionCls':'" + this.clazz + "',";
      buf = buf + "'predictionString':'" + this.predictionString + "'";
      try
      {
        if ((getCurVal() == 0.0D) && (getPredVal() == 0.0D))
        {
          Double tcurVal = (Double)this.caseValues.get(this.caseValues.size() - 1);
          setCurVal(tcurVal.doubleValue());
          Double tpredRet = Double.valueOf(Double.parseDouble(this.predictionString));
          Double tpredVal = Double.valueOf(tcurVal.doubleValue() * (1.0D + tpredRet.doubleValue()));
          setPredVal(tpredVal.doubleValue());
        }
      }
      catch (Exception e) {}
    }
    if ((getCurVal() != 0.0D) && (getPredVal() != 0.0D))
    {
      if (!buf.equals("")) {
        buf = buf + ",";
      }
      buf = buf + "'curValue':" + this.curVal + ",";
      buf = buf + "'predictedValue':" + this.predVal;
    }
    if (this.rng != null)
    {
      if (!buf.equals("")) {
        buf = buf + ",";
      }
      buf = buf + "'rng':" + this.rng;
    }
    if (this.status != null)
    {
      if (!buf.equals("")) {
        buf = buf + ",";
      }
      buf = buf + "'status':'" + this.status + "'";
    }
    if (!buf.equals("")) {
      buf = buf + ",";
    }
    buf = buf + "'presult':" + this.predictionLabel;
    if (!buf.equals("")) {
      buf = buf + ",";
    }
    buf = buf + "'pprob':" + this.predictionProb;
    


    return "{" + buf + "}";
  }
}
