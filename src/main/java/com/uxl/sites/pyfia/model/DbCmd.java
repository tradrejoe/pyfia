/**
 * 
 */
package com.uxl.sites.pyfia.model;

/**
 * @author uxldata
 *
 */
public class DbCmd {
	
	private String _cmd = null;

	public DbCmd() {
	
	}
	
	public DbCmd(String cmd, Object... args) {
		if (cmd==null || args==null || args.length==0) return;
		_cmd = String.format(cmd, args);
	}
	
	public String toString() {
		return _cmd;
	}

}
