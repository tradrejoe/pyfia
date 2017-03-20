//
// svm_model
//
package com.uxl.sites.pyfia.model.spm;

public class svm_model implements java.io.Serializable
{
	public svm_parameter param;	// parameter
	public int nr_class;		// number of classes, = 2 in regression/one class svm
	public int l;			// total #SV
	public svm_node[][] SV;	// SVs (SV[l])
	public double[][] sv_coef;	// coefficients for SVs in decision functions (sv_coef[k-1][l])
	public double[] rho;		// constants in decision functions (rho[k*(k-1)/2])
	public double[] probA;         // pariwise probability information
	public double[] probB;
	public int[] sv_indices;       // sv_indices[0,...,nSV-1] are values in [1,...,num_traning_data] to indicate SVs in the training set

	// for classification only

	public int[] label;		// label of each class (label[k])
	public int[] nSV;		// number of SVs for each class (nSV[k])
				// nSV[0] + nSV[1] + ... + nSV[k-1] = l
	public String toString() {
		String buf = "";
		buf += "param: " + param + ",\n";
		buf += "classes: " + nr_class + ",\n";
		buf += "total_sv: " + l + "\n";
		//buf += "SV: " + JsonUtil.toJsonObject(SV) + ",\n";
		//buf += "sv_coef: " + JsonUtil.toJsonDouble(sv_coef) + ",\n";
		//buf += "rho: " + JsonUtil.toJsonArrayDouble(rho) + ",\n";
		//buf += "probA: " + JsonUtil.toJsonArrayDouble(probA) + ",\n";
		//buf += "probB: " + JsonUtil.toJsonArrayDouble(probB) + ",\n";
		//buf += "sv_indices: " + JsonUtil.toJsonArrayInt(sv_indices) + "\n";
		
		return "{" + buf + "}";
	}
};
