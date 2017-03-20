package com.uxl.sites.pyfia.model.fin;

import java.io.ByteArrayInputStream;

public class RewindableByteArrayInputStream
  extends ByteArrayInputStream
{
  private byte[] data;
  
  public byte[] getData()
  {
    return this.data;
  }
  
  public void setData(byte[] data)
  {
    this.data = data;
  }
  
  public RewindableByteArrayInputStream(byte[] arg0)
  {
    super(arg0);
    this.data = arg0;
  }
  
  public RewindableByteArrayInputStream(byte[] arg0, int arg1, int arg2)
  {
    super(arg0, arg1, arg2);
  }
  
  public RewindableByteArrayInputStream rewind()
  {
    return new RewindableByteArrayInputStream(this.data);
  }
  
  public static void main(String[] args) {}
}
