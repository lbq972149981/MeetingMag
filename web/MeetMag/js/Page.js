/**
*=================================================================
*Name:			Ҷ��js��ҳ��ʽ��ShowoPage Style With JS��
*RCSfile:		Page.js
*Revision:		0.05Beta
*Author:		Yehe(Ҷ��)
*Released:		2005-04-21 19:50:55
*Description:	js��ҳ��ʽ����ʾ��һҳ��һҳ�ķ�ҳ���
*Contact:		QQ:311673,MSN:myehe@msn.com,http://www.yehe.org,http://www.showo.com
*=================================================================
*/

//�����滻
//���룺�������ַ���������ʽ���滻���ַ�
function Reg(sStr,sReg,sRe) {
	var sS=sStr,sR=sReg,sRe=sRe;
	if ((sS.length>0)&&(sR.length>0)) {
		eval("re=/"+sR+"/gim;");
		sS=sS.replace(re,sRe);
	}
	return (sS);
}
//��ʽ�������е������ַ�
function FormatReg(sReg) {
	var sR=sReg;
	var sF=new Array ("/",".","+","[","]","{","}","$","^","?","*");
	if (sR.length>0) {		
		for (i=0;i<=sF.length;i++) {
			sR=sR.replace(sF[i],"\\"+sF[i]);
		}
		sR="("+sR+")";		
	}
	return (sR);
}
//��ʽ��ҳ����0��ʾû��,1��ʾ�У�
//����ʽ���ַ����Ƿ�����Сֵ���Ƿ������ֵ����Сֵ��Ĭ��ֵ�������ֵ
function FormatNum(sNum,isMin,isMax,iMinNum,iMaxNum) {
	var iN,iTMin,iTMax,sN=""+sNum,iMin=iMinNum,iMax=iMaxNum;
	if (sN.length>0) {
		iN=parseInt(sN,10);
		iN=(isNaN(iN))?iMin:iN;
		iTMin=(iN<iMin)?iMin:iN;
		iTMax=(iN>iMax)?iMax:iN;
		iN=(isMin==1)?iTMin:iN;
		iN=(isMax==1)?iTMax:iN;
	}
	else {
		iN=iMin;
	}
	return (iN);
}
//ҳ����ת �����ֵ����ַģ�壬ҳ��ģ�壬��ҳ������ǰҳ
function PageJump(sPI,sU,sTP,iPC,iPI) {
	var sPL,sPV,sP;
	eval("sPL=document.getElementsByName(\""+sPI+"\").length;");
	if (sPL>1) {
		for (i=0;i<sPL;i++)	{
			eval("sPV=document.all."+sPI+"[i].value;");
			sP=FormatNum(sPV,1,1,0,iPC);
			if (sP>0) {
				location.href(sU.replace(sTP,sP));
				break;
			}
		}
	}
	else {
		eval("sPV=document.all."+sPI+".value;");
		sP=FormatNum(sPV,1,1,0,iPC);
		if (sP>0&&(sP!=iPI)) {
			location.href(sU.replace(sTP,sP));
		}
	}
}

function ShowoPage(iRecCount,iPageSize,iPageNum,sPageStart,sPageEnd,sU,sPageInput,sLPageFrist_D,sLPageFrist_E,sLPagePrev_D,sLPagePrev_E,sLPageNext_D,sLPageNext_E,sLPageLast_D,sLPageLast_E,sLPageText_D,sLPageText_E,sLPageTextF_D,sLPageTextF_E,sLPageSelect_D,sLPageSelect_E,sCssPageText,sCssPageInput,sCssPageSelect,sHtml) { 
//����ֵ
//iRecCount=550;//�ܼ�¼����
//iPageSize=21;//ÿҳ��¼��Ŀ
//iPageNum=4;//��ʾ��ǰ��ҳ��,0Ϊ��ʾ����,����Ϊ��ô��ҳ��һ����ת
//sPageStart="page=";//ҳ����ʼ�ַ�,����Ϊ��
//sPageEnd="";//ҳ�������ַ�
//sU="";//ҳ���ַ
//sPageInput="Page";//��תҳ�������nameֵ,�����˵�nameֵ
//sLPageFrist_D="��ҳ";//��ҳ
//sLPageFrist_E="<<";
//sLPagePrev_D="��ҳ";//��ҳ
//sLPagePrev_E="<";
//sLPageNext_D="��ҳ";//��ҳ
//sLPageNext_E=">";
//sLPageLast_D="βҳ";//βҳ
//sLPageLast_E=">>";
//sLPageText_D="[{$PageNum}]";//������ת
//sLPageText_E="��{$PageNum}ҳ";//������ת
//sLPageTextF_D="[{$PageNum}]";//������ת
//sLPageTextF_E="��{$PageNum}ҳ";//������ת
//sLPageSelect_D="&nbsp;{$PageTextF}&nbsp;";//�����˵���ת
//sLPageSelect_E="&nbsp;{$PageTextF}&nbsp;";//�����˵���ת
//sCssPageText="";//������תcss
//sCssPageInput="";//�������תcss
//sCssPageSelect="";//�����˵���תcss
//sHtml="";

	//��׼ģ���趨
	sTPage="{$Page}";//ҳ��
	sTPageCount="{$PageCount}";//��ҳ��
	sTRecCount="{$RecCount}";//�ܼ�¼��
	sTPageSize="{$PageSize}";//ÿҳ��¼��
	sTPageFrist="{$PageFrist}";//��ҳ
	sTPagePrev="{$PagePrev}";//��ҳ
	sTPageNext="{$PageNext}";//��ҳ
	sTPageLast="{$PageLast}";//βҳ
	sTPageText="{$PageText}";//������ת
	sTPageTextF="{$PageTextF}";//������ת���
	sTPageInput="{$PageInput}";//�������ת
	sTPageSelect="{$PageSelect}";//�����˵���ת
	sTPageNum="{$PageNum}";
	//�������ֵ
	iRC=FormatNum(iRecCount,1,0,0,0);//����
	iPS=FormatNum(iPageSize,1,0,1,0);//����
	iPN=FormatNum(iPageNum,0,0,0,0);//����
	iPC=(iRC%iPS==0)?(iRC/iPS):(FormatNum((iRC/iPS),1,0,0,0)+1);//����ҳ��
	sPI=(sPageInput.length>0)?sPageInput:"Page";//��תҳ�������ID,nameֵ
	sPS=(sPageStart.length>0)?sPageStart:sPI+"=";//ҳ����ʼ�ַ�
	sPE=(sPageEnd.length>0)?sPageEnd:"";//ҳ�������ַ�
	sTP=(sTPage.length>0)?sTPage:"{#Page}";//ҳ���滻ģ��
	sU=(sU.length>0)?sU:""+document.location;//
	if (sU.indexOf(sPS)==-1) {	
		sU+=(sU.indexOf("?")==-1)?"?"+sPS+sTP:"&"+sPS+sTP;
		//sU=Reg(sU,"(&+)","&");
		//sU=Reg(sU,"(\?&)","\?");
		iPI=1;
	}
	else {
		sReg="(\\S.*)"+FormatReg(sPS)+"(\\d*)"+FormatReg(sPE)+"(\\S.*|\\S*)";//�õ������ַ�
		sPageIndex=Reg(sU,sReg,"$3");//���������滻���õ�ҳ��
		sU=sU.replace(sPS+sPageIndex+sPE,sPS+sTP+sPE);//�õ�ģ���滻���url
		iPI=FormatNum(sPageIndex,1,1,0,iPC);//��ʽ��ҳ��Ϊ����
	}
	PrevP=FormatNum((iPI-1),1,1,1,iPC);
	NextP=FormatNum((iPI+1),1,1,1,iPC);
	if (iPI<=1&&iPC<=1) {
		FirstPageU=sLPageFrist_D;  
		PrevPageU=sLPagePrev_D;
		NextPageU=sLPageNext_D;
		LastPageU=sLPageLast_D;
	}
	else if (iPI==1&&iPC>1) {
		FirstPageU=sLPageFrist_D; 
		PrevPageU=sLPagePrev_D;
		NextPageU="<A href=\""+sU.replace(sTPage,NextP)+"\">"+sLPageNext_E+"</A>";
		LastPageU="<A href=\""+sU.replace(sTPage,iPC)+"\">"+sLPageLast_E+"</A>";
	}
	else if (iPI==iPC) {
		FirstPageU="<A href=\""+sU.replace(sTPage,1)+"\">"+sLPageFrist_E+"</A>";
		PrevPageU="<A href=\""+sU.replace(sTPage,PrevP)+"\">"+sLPagePrev_E+"</A>";
		NextPageU=sLPageNext_D;
		LastPageU=sLPageLast_D;
	}
	else {
		FirstPageU="<A href=\""+sU.replace(sTPage,1)+"\">"+sLPageFrist_E+"</A>";
		PrevPageU="<A href=\""+sU.replace(sTPage,PrevP)+"\">"+sLPagePrev_E+"</A>";
		NextPageU="<A href=\""+sU.replace(sTPage,NextP)+"\">"+sLPageNext_E+"</A>";
		LastPageU="<A href=\""+sU.replace(sTPage,iPC)+"\">"+sLPageLast_E+"</A>";
	}	
	PageSelect="<Select class=\""+sCssPageSelect+"\" name=\""+sPI+"\" onChange=\"PageJump(\'"+sPI+"\',\'"+sU+"\',\'"+sTP+"\',"+iPC+","+iPI+")\">";
	PageText="";
	PageInput="<Input class=\""+sCssPageInput+"\" type=\"text\" name=\""+sPI+"\" size=\"5\" maxlength=\"10\" onkeydown=\"if (event.keyCode==13) PageJump(\'"+sPI+"\',\'"+sU+"\',\'"+sTP+"\',"+iPC+","+iPI+")\">";
	if (iPageNum<0) {
		iPageNum=Math.abs(iPageNum);
		PageStart=(iPI%iPageNum==0)?(iPI/iPageNum):(FormatNum((iPI/iPageNum),1,0,0,0));
		PageStart=(PageStart*iPageNum==iPI)?((PageStart-1)*iPageNum+1):(PageStart*iPageNum+1);
		PageEnd=FormatNum(PageStart+iPageNum,0,1,0,iPC)
	}
	else if (iPageNum==0) {
		PageStart=1;
		PageEnd=iPC;
	}
	else {
		PageStart=FormatNum((iPI-iPN),1,0,1,0);
		PageEnd=FormatNum((PageStart+iPN*2),0,1,0,iPC);
		PageStart=(PageEnd==iPC)?FormatNum((PageEnd-iPN*2),1,0,1,0):PageStart;
	}
	if (iPC>=1) {
		for (i=PageStart;i<=PageEnd;i++) {
			if (i!=iPI) {
				XX="<span class=\""+sCssPageText+"\"><A  href=\""+sU.replace(sTPage,i)+"\">"+sLPageText_E.replace(sTPageNum,i)+"</A></span>";
				PageText+=sLPageTextF_E.replace(sTPageTextF,XX);
				PageSelect+="<Option value=\""+i+"\">"+sLPageSelect_E.replace(sTPageNum,i)+"</Option>";
			}
			else {
				XX="&nbsp;<span class=\""+sCssPageText+"\">"+sLPageText_D.replace(sTPageNum,i)+"</span>&nbsp;";
				PageText+=sLPageTextF_D.replace(sTPageTextF,XX);
				PageSelect+="<Option Selected=\"Selected\">"+sLPageSelect_D.replace(sTPageNum,i)+"</Option>";
			}
		}
	}
	PageSelect+="</Select>";
	var s=sHtml;
	s=s.replace(sTPage,iPI);
	s=s.replace(sTPageCount,iPC);
	s=s.replace(sTRecCount,iRC);
	s=s.replace(sTPageSize,iPS);
	s=s.replace(sTPageFrist,FirstPageU);
	s=s.replace(sTPagePrev,PrevPageU);
	s=s.replace(sTPageNext,NextPageU);
	s=s.replace(sTPageLast,LastPageU);
	s=s.replace(sTPageText,PageText);
	s=s.replace(sTPageInput,PageInput);
	s=s.replace(sTPageSelect,PageSelect);
	document.write (s);
}