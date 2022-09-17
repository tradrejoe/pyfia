package com.uxl.sites.pyfia.model.fin;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.StringTokenizer;
import java.util.TreeSet;

import com.uxl.sites.pyfia.model.fin.exceptions.NoPredictorsException;

import weka.core.converters.ConverterUtils.DataSource;

public class FincastRequest
  extends ForecastRequest
{
  public static final long serialVersionUID = 0L;
  private InputStream trainingSet;
  private InputStream testSet;
  private DataSource trainingSrc;
  private DataSource testSrc;
  private Double curVal;

  public Double getCurVal() {
	return curVal;
}

public void setCurVal(Double curVal) {
	this.curVal = curVal;
}

private ArrayList<String> attributesList = new ArrayList<String>();
  private ArrayList<Date> testCases = new ArrayList<Date>();
  private ArrayList<Double> cTestData = new ArrayList<Double>();
  private ArrayList<ArrayList<Double>> cTrainingData = new ArrayList<ArrayList<Double>>();
  
  public ArrayList<Double> getcTestData()
  {
    return this.cTestData;
  }
  
  public void setcTestData(ArrayList<Double> cTestData)
  {
    this.cTestData = cTestData;
  }
  
  public ArrayList<ArrayList<Double>> getcTrainingData()
  {
    return this.cTrainingData;
  }
  
  public void setcTrainingData(ArrayList<ArrayList<Double>> cTrainingData)
  {
    this.cTrainingData = cTrainingData;
  }
  
  private ArrayList<Double> testData = new ArrayList<Double>();
  private ArrayList<ArrayList<Double>> trainingData = new ArrayList<ArrayList<Double>>();
  private TreeSet<Double> uniqueValues = new TreeSet<Double>();
  private ArrayList<Double> caseValues = new ArrayList<Double>();
  private ArrayList<Double> caseValuesO = new ArrayList<Double>();
  private ArrayList<Double> caseValuesH = new ArrayList<Double>();
  private ArrayList<Double> caseValuesL = new ArrayList<Double>();
  private ArrayList<Double> caseValuesSD = new ArrayList<Double>();
  public ArrayList<Double> getCaseValuesSD() {
	return caseValuesSD;
}

public void setCaseValuesSD(ArrayList<Double> caseValuesSD) {
	this.caseValuesSD = caseValuesSD;
}

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

public static final String ATTR_SEP = ",";
  
  public ArrayList<Double> getCaseValues()
  {
    return this.caseValues;
  }
  
  public void setCaseValues(ArrayList<Double> caseValues)
  {
    this.caseValues = caseValues;
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
  
  public TreeSet<Double> getUniqueValues()
  {
    return this.uniqueValues;
  }
  
  public void setUniqueValues(TreeSet<Double> uniqueValues)
  {
    this.uniqueValues = uniqueValues;
  }
  
  public ArrayList<Date> getTestCases()
  {
    return this.testCases;
  }
  
  public void setTestCases(ArrayList<Date> testCases)
  {
    this.testCases = testCases;
  }
  
  public FincastRequest() {}
  
  public FincastRequest(ForecastRequest request)
  {
    this(request.getClazz(), request.getAttributes(), request.getCase(), request.getForecastRange(), Integer.valueOf(request.getHistory()), Boolean.valueOf(request.isSd()), request.getTarget());
  }
  
  public FincastRequest(String cls, String attr, Date dt, Integer rng, Integer history, Boolean sd, String target)
  {
    super(cls, attr, dt, rng, history, sd, target);
    setRequestId(super.getRequestId());
    StringTokenizer toks = new StringTokenizer(attr, ",");
    while (toks.hasMoreTokens())
    {
      String tmp = (toks.nextToken() + "").trim();
      if (!tmp.equals("")) {
        this.attributesList.add(tmp);
      }
    }
    if (this.attributesList.size() == 0) {
      throw new NoPredictorsException("No predictors specified for " + cls + ".");
    }
  }
  
  public InputStream getTrainingSet()
  {
    return this.trainingSet;
  }
  
  public void setTrainingSet(InputStream trainingSet)
  {
    this.trainingSet = trainingSet;
  }
  
  public InputStream getTestSet()
  {
    return this.testSet;
  }
  
  public void setTestSet(InputStream testSet)
  {
    this.testSet = testSet;
  }
  
  public FincastRequest(String testfile, String trainfile)
    throws FileNotFoundException, IOException
  {
    this(new FileInputStream(new File(testfile)), new FileInputStream(new File(trainfile)));
  }
  
  public static String readFile(InputStream in)
    throws IOException
  {
    BufferedReader reader = new BufferedReader(new InputStreamReader(in));
    String buf = "";
    String line = "";
    while ((line = reader.readLine()) != null) {
      buf = buf + line + new Character('\n');
    }
    buf = buf + new Character((char)65535);
    return buf;
  }
  
  public static String streamToString(InputStream stream)
  {
    String buf = "";
    if (stream != null) {
      try
      {
        BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
        String line = "";
        while ((line = reader.readLine()) != null) {
          buf = buf + line + 10;
        }
        buf = buf + -1;
      }
      catch (Exception e)
      {
        e.printStackTrace();
      }
    }
    return buf;
  }
  
  public String getTestSetAsString()
  {
    return streamToString(this.testSet);
  }
  
  public String getTrainingSetAsString()
  {
    return streamToString(this.trainingSet);
  }
  
  public FincastRequest(InputStream intest, InputStream intrain)
    throws IOException
  {
    BufferedReader readertest = new BufferedReader(new InputStreamReader(intest));
    BufferedReader readertrain = new BufferedReader(new InputStreamReader(intrain));
    String buftest = "";
    String buftrain = "";
    String line = "";
    while ((line = readertest.readLine()) != null) {
      buftest = buftest + line + new Character('\n');
    }
    buftest = buftest + new Character((char)65535);
    line = "";
    while ((line = readertrain.readLine()) != null) {
      buftrain = buftrain + line + new Character('\n');
    }
    buftrain = buftrain + new Character((char)65535);
    this.testSet = new RewindableByteArrayInputStream(buftest.getBytes());
    this.trainingSet = new RewindableByteArrayInputStream(buftrain.getBytes());
    




















































    readertest.close();
    readertrain.close();
  }
  
  private static final SimpleDateFormat SDF = new SimpleDateFormat("yyyy-MM-dd");
  
  public FincastResponse prepareResponse()
  {
    FincastResponse response = super.prepareResponse();
    response.setAttributesList(getAttributesList());
    response.setCases(getTestCases());
    ArrayList<String> tmp = new ArrayList<String>();
    for (Date dt : getTestCases()) {
      tmp.add(SDF.format(dt));
    }
    response.setCasesStr(tmp);
    response.setTestData(getTestData());
    response.setTrainingData(getTrainingData());
    response.setUniqueValues(getUniqueValues());
    response.setCaseValues(new ArrayList<Double>(getCaseValues()));
    response.setCaseValuesSD(getCaseValuesSD());
    response.setCaseValuesO(getCaseValuesO());
    response.setCaseValuesH(getCaseValuesH());
    response.setCaseValuesL(getCaseValuesL());
    response.setTarget(getTarget());
    return response;
  }
  
  public ArrayList<String> getAttributesList()
  {
    return this.attributesList;
  }
  
  public void setAttributesList(ArrayList<String> attributesList)
  {
    this.attributesList = attributesList;
  }
	public DataSource getTrainingSrc() {
		return trainingSrc;
	}
	
	public void setTrainingSrc(DataSource trainingSrc) {
		this.trainingSrc = trainingSrc;
	}
	
	public DataSource getTestSrc() {
		return testSrc;
	}
	
	public void setTestSrc(DataSource testSrc) {
		this.testSrc = testSrc;
	}  
}
