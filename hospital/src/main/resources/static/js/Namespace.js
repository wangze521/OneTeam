/**
 * 
 */
// ����һ��ȫ�ֶ���Namespace������ע�������ռ�
Namespace = new Object();

// ȫ�ֶ����������register����������Ϊ���ƿռ�ȫ·������"Grandsoft.GEA"
Namespace.register = function(fullNS) {
	// �������ռ��г�N����, ����Grandsoft��GEA��
	var nsArray = fullNS.split('.');
	var sEval = "";
	var sNS = "";
	for ( var i = 0; i < nsArray.length; i++) {
		if (i != 0)
			sNS += ".";
		sNS += nsArray[i];
		// ���δ������������ռ���󣨼��粻���ڵĻ��������
		// �����ȴ���Grandsoft��Ȼ�󴴽�Grandsoft.GEA��������ȥ
		sEval += "if (typeof(" + sNS + ") == 'undefined') " + sNS
				+ " = new Object();"
	}
	if (sEval != "")
		eval(sEval);
}