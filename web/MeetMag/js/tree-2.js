/***************************************************************************************
 *                               XMLTree2.1
 *     �˴����Ȩ�麣������ocean���У������Է���ҵĿ��ʹ�á����ơ��޸Ĵ˴��룬����Ҫ
 * �����������ҵİ�Ȩ��Ϣ�������ʹ�á��޸Ĵ˴���Ϊ��ҵĿ�ģ�����ϵ��������ȡ��ʹ����ɡ�
 * �˽ű�����ҵ���ΪRMB30������ɷ������ַܷ���ת��֮�⣬�������ڱ���ɷ����κ���Ŀ��
 * ��Ʒ���С�
 * ������Ա�������ʲô���飬��email to:ocean@forever.net.cn��
 *
 *                                                                          ��������
 *                                                          http://www.oceanstudio.net
 *                                                     ocean(ocean@forever.net.cn) ����
 *****************************************************************************************/ 

//XML����
function XMLTree(treeName) {
	this.id = treeName;
	this.xmlDoc = null;
	this.dblClick = false;    // "true"Ϊ������˫���¼���"false"Ϊ��������˫���¼���Ĭ��Ϊ"false"
	this.openAction = false;  //չ���ڵ�ʱ����Ϊ,"true"Ϊ��չ���Ľڵ�ȫ���رգ�"false"Ϊ��չ���Ľڵ�ȫ�����ֲ���.

	this.isOpened = false;	//�ڵ��Ƿ���չ���ģ�false��û��չ��
	this.isLoaded = false;	//�ڵ��Ƿ����Ѿ����صġ������ref�ͽڵ㣩
	this.isSelected = false;	//�ڵ��Ƿ�ѡ��

	this.ref = "";			//�����ⲿ��xml·��
	this.autoRefresh = false;	//�Ƿ��������¼����ⲿxml��false�������¼��أ�

	this.text = "";	//�ڵ������
	this.title = "";	//�ڵ����ʾ

	this.textColor = "#000000";	//�ڵ����ֵ���ɫ
	this.overTextColor = "#000000";	//�ڵ�������ȥʱ�����ֵ���ɫ
	this.selectedTextColor = "#000000";	//�ڵ㱻ѡ�к����ɫ

	this.backgroundColor = "";	//�ڵ�ı���ɫ
	this.overBackgroundColor = "";	//�ڵ�������ȥ�ǵı���ɫ
	this.selectedBackgroundColor = "#CCE0EF";	//�ڵ㱻ѡ��ʱ��ı���ɫ

	this.underLine = false;		//�ڵ������Ƿ����»��ߣ�false-û���»���
	this.overUnderLine = true;	//�ڵ�������ȥ��ʱ�������Ƿ����»��ߣ�false-û���»���
	this.selectedUnderLine = false;	//�ڵ�ѡ�е�ʱ�������Ƿ����»���

	this.fontSize = "12px";			//���ִ�С

	this.paddingLeft = "16px";//�������
	this.paddingTop = "1px";  //�ϱ�����
	this.spaceWidth = "1px";    //ͼƬ��ͼƬ�Լ�������ͼƬ֮����
	this.leafPaddingLeft = "0px";	//2.01��Ҷ����߶�������

	this.cursor = "hand";		//����Ĭ����״

	this.openFlag = "./images/pkg-open-0.gif";//�ڵ��ʱ�ĵ�һ��ͼƬ��һ����-�ţ�
	this.closeFlag = "./images/pkg-closed-0.gif";//�ڵ�ر�ʱ�ĵ�һ��ͼƬ��һ����+�ţ�
	this.openFolder = "./images/pkg-open-1.gif";//�ڵ��ʱ�ĵڶ���ͼƬ��һ����һ���ļ��е�ͼƬ��
	this.closeFolder = "./images/pkg-closed-1.gif";//�ڵ�ر�ʱ�ĵڶ���ͼƬ��һ����һ���ļ��е�ͼƬ��
	this.leafImage = "./images/leaf.gif";//Ҷ�ӽڵ��ͼƬ
	//this.openFolder = "./images/img_2B-t.gif";//�ڵ��ʱ�ĵڶ���ͼƬ��һ����һ���ļ��е�ͼƬ��
	//this.closeFolder = "./images/img_2A-t.gif";//�ڵ�ر�ʱ�ĵڶ���ͼƬ��һ����һ���ļ��е�ͼƬ��
	//this.leafImage = "./images/img_child-t.gif";//Ҷ�ӽڵ��ͼƬ
	this.href = "";//�ڵ��url����

	this.selectedNode = null;					//��ѡ�еĽڵ�

	this.doc = null;		//�ڵ���ĵ�����
	this.menuNode = new Array();		//�ڵ����飺�˽ڵ���Ӳ˵��е�ÿһ���ڵ�
	this.parent = null;			//�ڵ�ĸ��ף�Ϊnull�Ļ���������һ��������
	this.root = this;			//�ڵ�ĸ���Ϊnull�Ļ���������һ��������
	this.currentNode = null;	//��ǰ����ʹ�õĽڵ�
}
//�ⲿ�������첽xml��ȡ���ݣ���������һ��xml�ļ�
XMLTree.prototype.load = function (url,container) {
	if (container != null)
		this.doc = container;
	this.xmlDoc = new ActiveXObject("Msxml.DOMDocument");
	this.root.currentNode = this;
	var f = new Function("event",this.root.id+".currentNode.parseTree()");
	this.xmlDoc.onreadystatechange = f;
	this.xmlDoc.load(url);
}
//չ��һ���ڵ����һ���ӽڵ�
XMLTree.prototype.open = function (nodeId) {
	var node = this.getMenuItem(nodeId);
	if (node == null) node = this;		//���û���ҵ���Ӧ�Ľڵ㣬��������ڵ�
	if (node.parent == null) return;		//����ڵ��Ǹ���㣬�򷵻�
	var nodeType = node.getType();
	if (nodeType != "leaf") {		//Ҷ�ӽڵ㲻ȥ���
		if (nodeType == "node")	{	//�����һ�������ֽڵ�Ľڵ�
			node.doc.children[1].style.display = "block";
		}
		else {		//��������ýڵ�
			if (node.isLoaded) {	//����ڵ��Ѿ����أ���ֱ��չ��
				if (node.doc.children.length >= 2) {
					node.doc.children[1].style.display = "block";
				}
			}
			else {
				node.load(node.ref);		//�����ӽڵ����
				node.isLoaded = true;
			}
		}
		//��ʶ�ڵ�Ϊ��״̬
		node.isOpened = true;
		node.doc.children[0].rows[0].cells[0].children[0].src = node.openFlag;
		node.doc.children[0].rows[0].cells[1].children[0].src = node.openFolder;
	}
}
//�ر�һ���ڵ����һ���ӽڵ�
XMLTree.prototype.close = function (nodeId) {
	var node = this.getMenuItem(nodeId);
	if (node == null) node = this;		//���û���ҵ���Ӧ�Ľڵ㣬��������ڵ�
	if (node.parent == null) return;		//����ڵ��Ǹ���㣬�򷵻�
	var nodeType = node.getType();
	if (nodeType != "leaf") {		//Ҷ�ӽڵ㲻ȥ���
		if (nodeType == "node")	{	//�����һ�������ֽڵ�Ľڵ�
			if (node.doc.children.length >= 2) {
				node.doc.children[1].style.display = "none";
			}
		}
		else {		//��������ýڵ�
			if (node.autoRefresh) {			//����ڵ��������Ǽ����������ɾ�����˽ڵ���ӽڵ�
				node.doc.children[1].removeNode(true);
				node.menuNode = new Array();
				node.isLoaded = false;
			}
			else {
				if (node.doc.children.length >= 2) {
					node.doc.children[1].style.display = "none";
				}
			}
		}
		node.isOpened = false;
		node.doc.children[0].rows[0].cells[0].children[0].src = node.closeFlag;
		node.doc.children[0].rows[0].cells[1].children[0].src = node.closeFolder;
	}
}
//ѡ��һ���ڵ�
XMLTree.prototype.selected = function (nodeId) {
	var node = this.getMenuItem(nodeId);
	if (node == null) node = this;		//���û���ҵ���Ӧ�Ľڵ㣬��������ڵ�
	if (node.parent == null) return;		//����ڵ��Ǹ���㣬�򷵻�
	var oSpan = node.doc.children[0].cells[2].children[0];	//�ҵ��˽ڵ���Ӧ�����ֶ���
	with (oSpan.style) {
		color = node.selectedTextColor;
		backgroundColor = node.selectedBackgroundColor;
		textDecoration = node.selectedUnderLine ? "underline" : "none";
	}
	node.isSelected = true;				//��ʶ�ڵ㱻ѡ��
}
//ȡ��ѡ�е�һ���ڵ�
XMLTree.prototype.unSelected = function (nodeId) {
	var node = this.getMenuItem(nodeId);
	if (node == null) node = this;		//���û���ҵ���Ӧ�Ľڵ㣬��������ڵ�
	if (node.parent == null) return;		//����ڵ��Ǹ���㣬�򷵻�
	var oSpan = node.doc.children[0].cells[2].children[0];	//�ҵ��˽ڵ���Ӧ�����ֶ���
	with (oSpan.style) {
		color = node.textColor;
		backgroundColor = node.backgroundColor;
		textDecoration = node.underLine ? "underline" : "none";
	}
	node.isSelected = false;				//��ʶ�ڵ㱻ѡ��
}
//�õ���ǰ�ڵ�����ͣ�����"leaf"��"node"��"ref"�������
XMLTree.prototype.getType = function () {
	if (this.ref != "") return "ref";
	if (this.menuNode.length > 0) return "node";
	return "leaf";
}
//���ݲ˵���id���Ҳ˵������ӵ�д�id�Ĳ˵���
XMLTree.prototype.getMenuItem = function (id) {
	if (this.id == id) {		//����˽ڵ����ҪѰ�ҵĽڵ�
		return this;
	}
	else {
		for (var i=0;i<this.menuNode.length;i++) {
			var result = this.menuNode[i].getMenuItem(id);		//�ݹ������ӽڵ�
			if (result != null)		//����������򷵻ش˽ڵ�
				return result;
		}
		return null;		//������������򷵻�null
	}
}
//2.01�����ݲ˵���href���Ҳ˵������ӵ�д�href�Ĳ˵���
XMLTree.prototype.getMenuItemByHref = function (href) {
	if (this.href == href) {		//����˽ڵ����ҪѰ�ҵĽڵ�
		return this;
	}
	else {
		for (var i=0;i<this.menuNode.length;i++) {
			var result = this.menuNode[i].getMenuItemByHref(href);		//�ݹ������ӽڵ�
			if (result != null)		//����������򷵻ش˽ڵ�
				return result;
		}
		return null;		//������������򷵻�null
	}
}
//����xml��
XMLTree.prototype.parseTree = function () {
	var state = this.xmlDoc.readyState;
	if (state == 4)
	{
		var err = this.xmlDoc.parseError;
		if (err.errorCode != 0) {
			alert("�˵�������ʧ��");
			return false;
		}
		else {
			this.xmlDoc = this.xmlDoc.childNodes[1];
			this.initTree();
			this.attachTree();
			if (this.parent == null) {		//������Ǹ��Ļ����򸽼��¼�
				var f = new Function("event",this.id+".doClick()");
				this.doc.attachEvent("onclick",f);
				f = new Function("event",this.id+".doDblClick()");
				this.doc.attachEvent("ondblclick",f);
				f = new Function("event",this.id+".doMouseOver()");
				this.doc.attachEvent("onmouseover",f);
				f = new Function("event",this.id+".doMouseOut()");
				this.doc.attachEvent("onmouseout",f);
			}
		}
	}
}
//��ʼ��xml��
XMLTree.prototype.initTree = function () {
	if (this.xmlDoc == null) return;
	if (this.parent == null) {		//�����������
		this.dblClick = (this.xmlDoc.getAttribute("dbl-click") == "true") ? true : false;
		this.openAction = (this.xmlDoc.getAttribute("open-action") == "true") ? true : false;
		//ָ���ڵ��Ƿ��Ѿ��򿪣��˽ڵ�Ϊ��������ȡĬ��ֵ��
		this.isOpened = false;
		//�ڵ����ʽ�����ݸ�ֵ���˽ڵ�Ϊ��������ȡĬ��ֵ��
		this.autoRefresh = (this.xmlDoc.getAttribute("auto-refresh") == "true") ? true : false;
		this.textColor = (this.xmlDoc.getAttribute("text-color") == null) ? this.textColor : this.xmlDoc.getAttribute("text-color");
		this.overTextColor = (this.xmlDoc.getAttribute("over-text-color") == null) ? this.overTextColor : this.xmlDoc.getAttribute("over-text-color");
		this.selectedTextColor = (this.xmlDoc.getAttribute("selected-text-color") == null) ? this.selectedTextColor : this.xmlDoc.getAttribute("selected-text-color");
		this.backgroundColor = (this.xmlDoc.getAttribute("background-color") == null) ? this.backgroundColor : this.xmlDoc.getAttribute("background-color");
		this.overBackgroundColor = (this.xmlDoc.getAttribute("over-background-color") == null) ? this.overBackgroundColor : this.xmlDoc.getAttribute("over-background-color");
		this.selectedBackgroundColor = (this.xmlDoc.getAttribute("selected-background-color") == null) ? this.selectedBackgroundColor : this.xmlDoc.getAttribute("selected-background-color");
		this.underLine = (this.xmlDoc.getAttribute("under-line") == "true") ? true : false;
		this.overUnderLine = (this.xmlDoc.getAttribute("over-under-line") == "false") ? false : true;
		this.selectedUnderLine = (this.xmlDoc.getAttribute("selected-under-line") == "true") ? true : false;
		this.fontSize = (this.xmlDoc.getAttribute("font-size") == null) ? this.fontSize : this.xmlDoc.getAttribute("font-size");
		this.cursor = (this.xmlDoc.getAttribute("cursor") == null) ? this.cursor : this.xmlDoc.getAttribute("cursor");
		this.paddingLeft = (this.xmlDoc.getAttribute("padding-left") == null) ? this.paddingLeft : this.xmlDoc.getAttribute("padding-left");
		this.paddingTop = (this.xmlDoc.getAttribute("padding-top") == null) ? this.paddingTop : this.xmlDoc.getAttribute("padding-top");
		this.spaceWidth = (this.xmlDoc.getAttribute("space-width") == null) ? this.spaceWidth : this.xmlDoc.getAttribute("space-width");
		this.leafPaddingLeft = (this.xmlDoc.getAttribute("leaf-padding-left") == null) ? this.leafPaddingLeft : this.xmlDoc.getAttribute("leaf-padding-left");
		this.openFlag = (this.xmlDoc.getAttribute("open-flag") == null) ? this.openFlag : this.xmlDoc.getAttribute("open-flag");
		this.closeFlag = (this.xmlDoc.getAttribute("close-flag") == null) ? this.closeFlag : this.xmlDoc.getAttribute("close-flag");
		this.openFolder = (this.xmlDoc.getAttribute("open-folder") == null) ? this.openFolder : this.xmlDoc.getAttribute("open-folder");
		this.closeFolder = (this.xmlDoc.getAttribute("close-folder") == null) ? this.closeFolder : this.xmlDoc.getAttribute("close-folder");
		this.leafImage = (this.xmlDoc.getAttribute("leaf-image") == null) ? this.leafImage : this.xmlDoc.getAttribute("leaf-image");
	}
	//������ѭ�����ã����ɴ˽ڵ�ڵ��ÿһ���ӽڵ�
	for (var i=0;i<this.xmlDoc.childNodes.length;i++)	{
		var child = this.xmlDoc.childNodes[i];
		var node = new XMLTree(child.getAttribute("id"));		//����һ���½ڵ�
		node.parent = this;		//ָ���ڵ�ĸ���
		node.root = this.root;		//ָ���ڵ�ĸ�


		//ָ���ڵ��Ƿ��Ѿ���
		node.isOpened = (child.getAttribute("opened") == "true") ? true : false;
		//�ڵ����ʽ�����ݸ�ֵ
		node.ref = (child.getAttribute("ref") == null) ? "" : child.getAttribute("ref");
		node.autoRefresh = (child.getAttribute("auto-refresh") == "true") ? true : false;
		node.text = (child.getAttribute("text") == null) ? "" : child.getAttribute("text");
		node.title = (child.getAttribute("title") == null) ? node.text : child.getAttribute("title");
		node.textColor = (child.getAttribute("text-color") == null) ? this.textColor : child.getAttribute("text-color");
		node.overTextColor = (child.getAttribute("over-text-color") == null) ? this.overTextColor : child.getAttribute("over-text-color");
		node.selectedTextColor = (child.getAttribute("selected-text-color") == null) ? this.selectedTextColor : child.getAttribute("selected-text-color");
		node.backgroundColor = (child.getAttribute("background-color") == null) ? this.backgroundColor : child.getAttribute("background-color");
		node.overBackgroundColor = (child.getAttribute("over-background-color") == null) ? this.overBackgroundColor : child.getAttribute("over-background-color");
		node.selectedBackgroundColor = (child.getAttribute("selected-background-color") == null) ? this.selectedBackgroundColor : child.getAttribute("selected-background-color");
		node.underLine = (child.getAttribute("under-line") == "true") ? true : false;
		node.overUnderLine = (child.getAttribute("over-under-line") == "false") ? false : true;
		node.selectedUnderLine = (child.getAttribute("selected-under-line") == "true") ? true : false;
		node.fontSize = (child.getAttribute("font-size") == null) ? this.fontSize : child.getAttribute("font-size");
		node.cursor = (child.getAttribute("cursor") == null) ? this.cursor : child.getAttribute("cursor");
		node.paddingLeft = (child.getAttribute("padding-left") == null) ? this.paddingLeft : child.getAttribute("padding-left");
		node.paddingTop = (child.getAttribute("padding-top") == null) ? this.paddingTop : child.getAttribute("padding-top");
		node.spaceWidth = (child.getAttribute("space-width") == null) ? this.spaceWidth : child.getAttribute("space-width");
		node.leafPaddingLeft = (child.getAttribute("leaf-padding-left") == null) ? this.leafPaddingLeft : child.getAttribute("leaf-padding-left");
		node.openFlag = (child.getAttribute("open-flag") == null) ? this.openFlag : child.getAttribute("open-flag");
		node.closeFlag = (child.getAttribute("close-flag") == null) ? this.closeFlag : child.getAttribute("close-flag");
		node.openFolder = (child.getAttribute("open-folder") == null) ? this.openFolder : child.getAttribute("open-folder");
		node.closeFolder = (child.getAttribute("close-folder") == null) ? this.closeFolder : child.getAttribute("close-folder");
		node.leafImage = (child.getAttribute("leaf-image") == null) ? this.leafImage : child.getAttribute("leaf-image");
		node.href = (child.getAttribute("href") == null) ? "" : child.getAttribute("href");

		this.menuNode[this.menuNode.length] = node;		//����һ���½ڵ�
		node.xmlDoc = child;
		node.initTree();		//�ݹ���ã����ش˽ڵ���ӽڵ�
	}
}
//�����ĵ�����
XMLTree.prototype.attachTree = function () {
	if (this.menuNode.length == 0) return;	//�����û�м��ص����ýڵ������Ҷ�ӽڵ㣬�򷵻�
	var container = null;
	if (this.parent == null) {
		container = this.doc;
	}
	else {
		container = document.createElement("DIV");
		container.style.paddingLeft = this.paddingLeft;		//��������
		container.style.paddingTop = this.paddingTop;		//�����ϱ߾�
		container.style.width = "100%";
		if (this.getType() == "ref") {		//��������ýڵ㣬���ʶ�򿪺��Ѿ�����
			this.isOpened = true;
			this.isLoaded = true;
		}
		if (this.isOpened) {
			container.style.display = "block";
		}
		else {
			container.style.display = "none";
		}

	}
	this.doc.appendChild(container);

	for (var i=0;i<this.menuNode.length;i++) {
		var node = this.menuNode[i];
		var oDiv = document.createElement("DIV");
		oDiv.id = this.root.id+node.id;
		oDiv.style.width = "100%";
		var html = "";
		html += '<table style="width:100%" title="'+node.title+'"><tr><td style="width:1px;vertical-align:middle;">';
		html += (node.getType() == "leaf") ? "" : ('<img src="'+(node.isOpened ? node.openFlag : node.closeFlag)+'">');
		html += '</td><td style="width:1px;padding-left:'+((node.getType() == "leaf") ? node.leafPaddingLeft : node.spaceWidth)+';vertical-align:middle;"><img src="';
		html += (node.getType() == "leaf") ? node.leafImage : (node.isOpened ? node.openFolder : node.closeFolder);
		html += '"></td><td style="vertical-align:middle;'+((node.getType() == "leaf") ? "padding-top:"+node.paddingTop+";" : "")+'padding-left:' +node.spaceWidth+';"><span style="cursor:'+node.cursor+';font-size:'+node.fontSize+';color:'+node.textColor+';background-color:'+node.backgroundColor+';text-decoration:'+(node.underLine ? "underline" : "none")+ ';">'+node.text+'</span></td></tr></table>';
		oDiv.innerHTML = html;
		container.appendChild(oDiv);
		node.doc = oDiv;			//�����ĵ�����
		node.attachTree();			//�ݹ������
	}
}
//���ݴ���Ķ����ҵ���Ӧ�Ľڵ�
XMLTree.prototype.getNode = function (oE) {
	while (oE.tagName != "DIV" && oE.tagName != "BODY")	{
		oE = oE.parentElement;
	}
	if (oE.tagName == "BODY") return;
	return this.root.getMenuItem(oE.id.substr(this.root.id.length));
}
//����onmouseover�¼�
XMLTree.prototype.doMouseOver = function () {
	var oE = window.event.srcElement;
	if (oE.tagName != "SPAN") return;	//��������Ƴ��������ϣ�ֱ�ӷ���
	var node = this.getNode(oE);		//�õ��˽ڵ�Ķ���
	if (node == null)	return;			//����˽ڵ����Ϊnull���򷵻�
	if (node.isSelected) return;		//����˽ڵ�����Ѿ���ѡ�У��򷵻�
	with (oE.style) {
		color = node.overTextColor;
		backgroundColor = node.overBackgroundColor;
		textDecoration = node.overUnderLine ? "underline" : "none";
	}
}
//����onmouseout�¼�
XMLTree.prototype.doMouseOut = function () {
	var oE = window.event.srcElement;
	if (oE.tagName != "SPAN") return;	//��������ƶ��������ϣ�ֱ�ӷ���
	var node = this.getNode(oE);		//�õ��˽ڵ�Ķ���
	if (node == null)	return;			//����˽ڵ����Ϊnull���򷵻�
	if (node.isSelected) return;		//����˽ڵ�����Ѿ���ѡ�У��򷵻�
	with (oE.style) {
		color = node.textColor;
		backgroundColor = node.backgroundColor;
		textDecoration = node.underLine ? "underline" : "none";
	}
}
//����onclick�¼�
XMLTree.prototype.doClick = function () {
	var oE = window.event.srcElement;
	if (oE.tagName != "SPAN" && oE.tagName != "IMG") return;	//������ǵ��������ֻ���ͼƬ�ϣ�ֱ�ӷ���
	var node = this.getNode(oE);		//�õ��˽ڵ�Ķ���
	if (node == null)	return;			//����˽ڵ����Ϊnull���򷵻�
	var doOpen = false;			//��ʶ�Ƿ���չ������
	//����ǵ����������
	if (oE.tagName == "SPAN") {
		if (node.root.selectedNode != node)	{
			if (node.root.selectedNode != null) node.root.selectedNode.unSelected();	//ȡ��ѡ����һ����ѡ�еĽڵ�
			if (!node.isSelected) {		//�����ǰ�ڵ�û�б�ѡ��
				node.selected();	//ѡ�е�ǰ�Ľڵ�
				node.root.selectedNode = node;	//��ס��ǰ��ѡ�еĽڵ�
			}
		}

		if (node.href != "") {
			window.location.href = node.href;		//���������ϵ�����
		}

		if (!node.root.dblClick) {	//�������˫���ڵ�Ŵ�/�رսڵ㣬Ҳ���ǵ����ʹ�/�رսڵ�
			if (node.isOpened) {
				node.close();
			}
			else {
				node.open();
				doOpen = true;
			}
		}
	}
	else {		//����ǵ����ͼƬ�ϣ���ֱ�Ӵ�/�رսڵ�
		if (node.isOpened) {
			node.close();
		}
		else {
			node.open();
			doOpen = true;
		}
	}
	if (doOpen)	{	//�����չ����������Ҫ�ж�չ����������Ϊ
		if (node.root.openAction)	{		//˵����Ҫ�ر������ڵ�
			node.closeAllNode();
		}
	}
}
//����ondblclick�¼�
XMLTree.prototype.doDblClick = function () {
	if (!this.root.dblClick) return;	//������Ǳ���ͨ��˫����չ��/�رսڵ㣬��ֱ�ӷ���
	var oE = window.event.srcElement;
	if (oE.tagName != "SPAN") return;	//�������˫���������ϣ�ֱ�ӷ���
	var node = this.getNode(oE);		//�õ��˽ڵ�Ķ���
	if (node == null)	return;			//����˽ڵ����Ϊnull���򷵻�

	if (node.root.selectedNode != null) node.root.selectedNode.unSelected();	//ȡ��ѡ����һ����ѡ�еĽڵ�
	node.selected();	//ѡ�е�ǰ�Ľڵ�
	node.root.selectedNode = node;	//��ס��ǰ��ѡ�еĽڵ�

	if (node.href != "") {
		window.location.href = node.href;		//���������ϵ�����
	}

	if (node.isOpened) {
		node.close();
	}
	else {
		node.open();
		if (node.root.openAction) {		//˵����Ҫ�ر������ڵ�
			node.closeAllNode();
		}
	}
}
//�رճ�����ڵ�֮������нڵ�
XMLTree.prototype.closeAllNode = function () {
	if (this.parent == null) return;		//�Ѿ����˸�
	var parentNode = this.parent;
	for (var i=0;i<parentNode.menuNode.length;i++) {	//ѭ���ر�ÿһ���ӽڵ�
		var childnode = parentNode.menuNode[i];
		if (childnode.isOpened)	{		//����ӽڵ��Ѿ���
			if (childnode != this) {	//����ӽڵ㲻�ǵ�ǰ�ڵ�
				childnode.close();
			}
		}
	}
	parentNode.closeAllNode();		//�����رո��ڵ�֮������нڵ㣨�ݹ���ã�
}
//2.0��������ڵ����ָ����id�Ľڵ�ĸ��ڵ�չ��(2.1����bug)
XMLTree.prototype.openParent = function (nodeId) {
	var node = this.getMenuItem(nodeId);
	if (node == null) node = this;
	if (node.parent == null) {
		return;
	}
	node.parent.openParent();
	node.open();
	if (node.root.selectedNode != node)	{
		if (node.root.selectedNode != null) node.root.selectedNode.unSelected();	//ȡ��ѡ����һ����ѡ�еĽڵ�
		if (!node.isSelected) {		//�����ǰ�ڵ�û�б�ѡ��
			node.selected();	//ѡ�е�ǰ�Ľڵ�
			node.root.selectedNode = node;	//��ס��ǰ��ѡ�еĽڵ�
		}
	}
}
//2.01��������ڵ����ָ��href�ڵ�ĸ��ڵ�չ��
XMLTree.prototype.openParentByHref = function (href) {
	var node = this.getMenuItemByHref(href);
	if (node == null) return;
	node.openParent();
}