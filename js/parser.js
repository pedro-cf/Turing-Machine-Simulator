//6
var _dbg_withparsetree	= true;
var _dbg_withtrace		= false;
var _dbg_withstepbystep	= false;

function verifyLex(str) {
	
	semTree=[];
	  var error_offsets = new Array();
		var error_lookaheads = new Array();
		var error_count = 0;

		if (( error_count = __parse( str, error_offsets, error_lookaheads ) ) === 0 )
		{
			validTM = "T"; //VALID

		} else {
			validTM = "F"; //INVALID
			var errstr = new String();
				for( var i = 0; i < error_count; i++ )
				errstr += "Parse error in line " +
				( str.substr( 0, error_offsets[i] ).match( /\n/g ) ?
				str.substr( 0, error_offsets[i] ).match( /\n/g ).length : 1 )
				+ " near \"" + str.substr( error_offsets[i] )
				+ "\", expecting \"" + error_lookaheads[i].join()
				+ "\"\n" ; parserVerifyAlert( errstr );
		}
		updateVerifyUI();
		
}


/*
	Default driver template for JS/CC generated parsers for Mozilla/Rhino
	
	WARNING: Do not use for parsers that should run as browser-based JavaScript!
			 Use driver_web.js_ instead!
	
	Features:
	- Parser trace messages
	- Step-by-step parsing
	- Integrated panic-mode error recovery
	- Pseudo-graphical parse tree generation
	
	Written 2007 by Jan Max Meyer, J.M.K S.F. Software Technologies
        Modified 2007 from driver.js_ to support Mozilla/Rhino
           by Louis P.Santillan <lpsantil@gmail.com>
	
	This is in the public domain.
*/

function __dbg_print( text )
{
	//print( text );
}

function __dbg_wait()
{
   var kbd = new java.io.BufferedReader(
                new java.io.InputStreamReader( java.lang.System[ "in" ] ) );

   kbd.readLine();
}

function __lex( info )
{
	var state		= 0;
	var match		= -1;
	var match_pos	= 0;
	var start		= 0;
	var pos			= info.offset + 1;

	do
	{
		pos--;
		state = 0;
		match = -2;
		start = pos;

		if( info.src.length <= start )
			return 40;

		do
		{

switch( state )
{
	case 0:
		if( ( info.src.charCodeAt( pos ) >= 9 && info.src.charCodeAt( pos ) <= 10 ) ) state = 1;
		else if( info.src.charCodeAt( pos ) == 40 ) state = 2;
		else if( info.src.charCodeAt( pos ) == 41 ) state = 3;
		else if( info.src.charCodeAt( pos ) == 44 ) state = 4;
		else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 75 ) || ( info.src.charCodeAt( pos ) >= 77 && info.src.charCodeAt( pos ) <= 81 ) || ( info.src.charCodeAt( pos ) >= 84 && info.src.charCodeAt( pos ) <= 90 ) || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 5;
		else if( info.src.charCodeAt( pos ) == 62 ) state = 6;
		else if( info.src.charCodeAt( pos ) == 76 || ( info.src.charCodeAt( pos ) >= 82 && info.src.charCodeAt( pos ) <= 83 ) ) state = 7;
		else if( info.src.charCodeAt( pos ) == 60 ) state = 27;
		else if( info.src.charCodeAt( pos ) == 32 ) state = 28;
		else state = -1;
		break;

	case 1:
		state = -1;
		match = 1;
		match_pos = pos;
		break;

	case 2:
		state = -1;
		match = 2;
		match_pos = pos;
		break;

	case 3:
		state = -1;
		match = 3;
		match_pos = pos;
		break;

	case 4:
		state = -1;
		match = 23;
		match_pos = pos;
		break;

	case 5:
		if( info.src.charCodeAt( pos ) == 32 || ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 8;
		else state = -1;
		match = 25;
		match_pos = pos;
		break;

	case 6:
		state = -1;
		match = 4;
		match_pos = pos;
		break;

	case 7:
		if( info.src.charCodeAt( pos ) == 32 || ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 8;
		else state = -1;
		match = 24;
		match_pos = pos;
		break;

	case 8:
		if( info.src.charCodeAt( pos ) == 32 || ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 8;
		else state = -1;
		match = 26;
		match_pos = pos;
		break;

	case 9:
		state = -1;
		match = 5;
		match_pos = pos;
		break;

	case 10:
		state = -1;
		match = 6;
		match_pos = pos;
		break;

	case 11:
		state = -1;
		match = 11;
		match_pos = pos;
		break;

	case 12:
		state = -1;
		match = 21;
		match_pos = pos;
		break;

	case 13:
		state = -1;
		match = 12;
		match_pos = pos;
		break;

	case 14:
		state = -1;
		match = 22;
		match_pos = pos;
		break;

	case 15:
		state = -1;
		match = 7;
		match_pos = pos;
		break;

	case 16:
		state = -1;
		match = 8;
		match_pos = pos;
		break;

	case 17:
		state = -1;
		match = 9;
		match_pos = pos;
		break;

	case 18:
		state = -1;
		match = 10;
		match_pos = pos;
		break;

	case 19:
		state = -1;
		match = 15;
		match_pos = pos;
		break;

	case 20:
		state = -1;
		match = 13;
		match_pos = pos;
		break;

	case 21:
		state = -1;
		match = 16;
		match_pos = pos;
		break;

	case 22:
		state = -1;
		match = 14;
		match_pos = pos;
		break;

	case 23:
		state = -1;
		match = 19;
		match_pos = pos;
		break;

	case 24:
		state = -1;
		match = 20;
		match_pos = pos;
		break;

	case 25:
		state = -1;
		match = 17;
		match_pos = pos;
		break;

	case 26:
		state = -1;
		match = 18;
		match_pos = pos;
		break;

	case 27:
		if( info.src.charCodeAt( pos ) == 47 ) state = 29;
		else if( info.src.charCodeAt( pos ) == 65 ) state = 30;
		else if( info.src.charCodeAt( pos ) == 69 ) state = 31;
		else if( info.src.charCodeAt( pos ) == 83 ) state = 32;
		else if( info.src.charCodeAt( pos ) == 84 ) state = 33;
		else if( info.src.charCodeAt( pos ) == 66 ) state = 80;
		else if( info.src.charCodeAt( pos ) == 73 ) state = 81;
		else state = -1;
		break;

	case 28:
		if( info.src.charCodeAt( pos ) == 32 || ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 8;
		else state = -1;
		match = 1;
		match_pos = pos;
		break;

	case 29:
		if( info.src.charCodeAt( pos ) == 84 ) state = 82;
		else if( info.src.charCodeAt( pos ) == 69 ) state = 120;
		else if( info.src.charCodeAt( pos ) == 66 ) state = 126;
		else if( info.src.charCodeAt( pos ) == 73 ) state = 127;
		else if( info.src.charCodeAt( pos ) == 83 ) state = 129;
		else if( info.src.charCodeAt( pos ) == 65 ) state = 133;
		else state = -1;
		break;

	case 30:
		if( info.src.charCodeAt( pos ) == 76 ) state = 34;
		else state = -1;
		break;

	case 31:
		if( info.src.charCodeAt( pos ) == 78 ) state = 36;
		else state = -1;
		break;

	case 32:
		if( info.src.charCodeAt( pos ) == 84 ) state = 83;
		else state = -1;
		break;

	case 33:
		if( info.src.charCodeAt( pos ) == 77 ) state = 38;
		else if( info.src.charCodeAt( pos ) == 82 ) state = 106;
		else state = -1;
		break;

	case 34:
		if( info.src.charCodeAt( pos ) == 80 ) state = 40;
		else state = -1;
		break;

	case 35:
		if( info.src.charCodeAt( pos ) == 65 ) state = 41;
		else state = -1;
		break;

	case 36:
		if( info.src.charCodeAt( pos ) == 68 ) state = 42;
		else state = -1;
		break;

	case 37:
		if( info.src.charCodeAt( pos ) == 73 ) state = 43;
		else if( info.src.charCodeAt( pos ) == 80 ) state = 44;
		else state = -1;
		break;

	case 38:
		if( info.src.charCodeAt( pos ) == 62 ) state = 9;
		else state = -1;
		break;

	case 39:
		if( info.src.charCodeAt( pos ) == 62 ) state = 10;
		else state = -1;
		break;

	case 40:
		if( info.src.charCodeAt( pos ) == 72 ) state = 45;
		else state = -1;
		break;

	case 41:
		if( info.src.charCodeAt( pos ) == 78 ) state = 46;
		else state = -1;
		break;

	case 42:
		if( info.src.charCodeAt( pos ) == 83 ) state = 97;
		else state = -1;
		break;

	case 43:
		if( info.src.charCodeAt( pos ) == 84 ) state = 47;
		else state = -1;
		break;

	case 44:
		if( info.src.charCodeAt( pos ) == 85 ) state = 48;
		else state = -1;
		break;

	case 45:
		if( info.src.charCodeAt( pos ) == 65 ) state = 50;
		else state = -1;
		break;

	case 46:
		if( info.src.charCodeAt( pos ) == 75 ) state = 51;
		else state = -1;
		break;

	case 47:
		if( info.src.charCodeAt( pos ) == 83 ) state = 103;
		else state = -1;
		break;

	case 48:
		if( info.src.charCodeAt( pos ) == 84 ) state = 53;
		else state = -1;
		break;

	case 49:
		if( info.src.charCodeAt( pos ) == 69 ) state = 54;
		else state = -1;
		break;

	case 50:
		if( info.src.charCodeAt( pos ) == 66 ) state = 59;
		else state = -1;
		break;

	case 51:
		if( info.src.charCodeAt( pos ) == 62 ) state = 11;
		else state = -1;
		break;

	case 52:
		if( info.src.charCodeAt( pos ) == 65 ) state = 92;
		else state = -1;
		break;

	case 53:
		if( info.src.charCodeAt( pos ) == 62 ) state = 12;
		else state = -1;
		break;

	case 54:
		if( info.src.charCodeAt( pos ) == 83 ) state = 61;
		else state = -1;
		break;

	case 55:
		if( info.src.charCodeAt( pos ) == 73 ) state = 100;
		else state = -1;
		break;

	case 56:
		if( info.src.charCodeAt( pos ) == 62 ) state = 13;
		else state = -1;
		break;

	case 57:
		if( info.src.charCodeAt( pos ) == 84 ) state = 113;
		else state = -1;
		break;

	case 58:
		if( info.src.charCodeAt( pos ) == 62 ) state = 14;
		else state = -1;
		break;

	case 59:
		if( info.src.charCodeAt( pos ) == 69 ) state = 93;
		else state = -1;
		break;

	case 60:
		if( info.src.charCodeAt( pos ) == 65 ) state = 101;
		else state = -1;
		break;

	case 61:
		if( info.src.charCodeAt( pos ) == 62 ) state = 15;
		else state = -1;
		break;

	case 62:
		if( info.src.charCodeAt( pos ) == 62 ) state = 16;
		else state = -1;
		break;

	case 63:
		if( info.src.charCodeAt( pos ) == 84 ) state = 125;
		else state = -1;
		break;

	case 64:
		if( info.src.charCodeAt( pos ) == 69 ) state = 67;
		else state = -1;
		break;

	case 65:
		if( info.src.charCodeAt( pos ) == 73 ) state = 69;
		else state = -1;
		break;

	case 66:
		if( info.src.charCodeAt( pos ) == 62 ) state = 17;
		else state = -1;
		break;

	case 67:
		if( info.src.charCodeAt( pos ) == 83 ) state = 71;
		else state = -1;
		break;

	case 68:
		if( info.src.charCodeAt( pos ) == 69 ) state = 72;
		else state = -1;
		break;

	case 69:
		if( info.src.charCodeAt( pos ) == 79 ) state = 73;
		else state = -1;
		break;

	case 70:
		if( info.src.charCodeAt( pos ) == 62 ) state = 18;
		else state = -1;
		break;

	case 71:
		if( info.src.charCodeAt( pos ) == 62 ) state = 19;
		else state = -1;
		break;

	case 72:
		if( info.src.charCodeAt( pos ) == 62 ) state = 20;
		else state = -1;
		break;

	case 73:
		if( info.src.charCodeAt( pos ) == 78 ) state = 76;
		else state = -1;
		break;

	case 74:
		if( info.src.charCodeAt( pos ) == 62 ) state = 21;
		else state = -1;
		break;

	case 75:
		if( info.src.charCodeAt( pos ) == 62 ) state = 22;
		else state = -1;
		break;

	case 76:
		if( info.src.charCodeAt( pos ) == 62 ) state = 23;
		else if( info.src.charCodeAt( pos ) == 83 ) state = 78;
		else state = -1;
		break;

	case 77:
		if( info.src.charCodeAt( pos ) == 62 ) state = 24;
		else if( info.src.charCodeAt( pos ) == 83 ) state = 79;
		else state = -1;
		break;

	case 78:
		if( info.src.charCodeAt( pos ) == 62 ) state = 25;
		else state = -1;
		break;

	case 79:
		if( info.src.charCodeAt( pos ) == 62 ) state = 26;
		else state = -1;
		break;

	case 80:
		if( info.src.charCodeAt( pos ) == 76 ) state = 35;
		else state = -1;
		break;

	case 81:
		if( info.src.charCodeAt( pos ) == 78 ) state = 37;
		else state = -1;
		break;

	case 82:
		if( info.src.charCodeAt( pos ) == 77 ) state = 39;
		else if( info.src.charCodeAt( pos ) == 82 ) state = 119;
		else state = -1;
		break;

	case 83:
		if( info.src.charCodeAt( pos ) == 65 ) state = 86;
		else state = -1;
		break;

	case 84:
		if( info.src.charCodeAt( pos ) == 78 ) state = 88;
		else state = -1;
		break;

	case 85:
		if( info.src.charCodeAt( pos ) == 83 ) state = 89;
		else state = -1;
		break;

	case 86:
		if( info.src.charCodeAt( pos ) == 84 ) state = 49;
		else state = -1;
		break;

	case 87:
		if( info.src.charCodeAt( pos ) == 75 ) state = 56;
		else state = -1;
		break;

	case 88:
		if( info.src.charCodeAt( pos ) == 83 ) state = 55;
		else state = -1;
		break;

	case 89:
		if( info.src.charCodeAt( pos ) == 84 ) state = 124;
		else state = -1;
		break;

	case 90:
		if( info.src.charCodeAt( pos ) == 83 ) state = 62;
		else state = -1;
		break;

	case 91:
		if( info.src.charCodeAt( pos ) == 73 ) state = 63;
		else state = -1;
		break;

	case 92:
		if( info.src.charCodeAt( pos ) == 84 ) state = 64;
		else state = -1;
		break;

	case 93:
		if( info.src.charCodeAt( pos ) == 84 ) state = 66;
		else state = -1;
		break;

	case 94:
		if( info.src.charCodeAt( pos ) == 83 ) state = 74;
		else state = -1;
		break;

	case 95:
		if( info.src.charCodeAt( pos ) == 69 ) state = 75;
		else state = -1;
		break;

	case 96:
		if( info.src.charCodeAt( pos ) == 78 ) state = 77;
		else state = -1;
		break;

	case 97:
		if( info.src.charCodeAt( pos ) == 84 ) state = 52;
		else state = -1;
		break;

	case 98:
		if( info.src.charCodeAt( pos ) == 83 ) state = 57;
		else state = -1;
		break;

	case 99:
		if( info.src.charCodeAt( pos ) == 84 ) state = 58;
		else state = -1;
		break;

	case 100:
		if( info.src.charCodeAt( pos ) == 84 ) state = 65;
		else state = -1;
		break;

	case 101:
		if( info.src.charCodeAt( pos ) == 84 ) state = 68;
		else state = -1;
		break;

	case 102:
		if( info.src.charCodeAt( pos ) == 83 ) state = 91;
		else state = -1;
		break;

	case 103:
		if( info.src.charCodeAt( pos ) == 84 ) state = 60;
		else state = -1;
		break;

	case 104:
		if( info.src.charCodeAt( pos ) == 84 ) state = 70;
		else state = -1;
		break;

	case 105:
		if( info.src.charCodeAt( pos ) == 84 ) state = 95;
		else state = -1;
		break;

	case 106:
		if( info.src.charCodeAt( pos ) == 65 ) state = 84;
		else state = -1;
		break;

	case 107:
		if( info.src.charCodeAt( pos ) == 68 ) state = 85;
		else state = -1;
		break;

	case 108:
		if( info.src.charCodeAt( pos ) == 78 ) state = 87;
		else state = -1;
		break;

	case 109:
		if( info.src.charCodeAt( pos ) == 84 ) state = 98;
		else state = -1;
		break;

	case 110:
		if( info.src.charCodeAt( pos ) == 85 ) state = 99;
		else state = -1;
		break;

	case 111:
		if( info.src.charCodeAt( pos ) == 69 ) state = 90;
		else state = -1;
		break;

	case 112:
		if( info.src.charCodeAt( pos ) == 69 ) state = 104;
		else state = -1;
		break;

	case 113:
		if( info.src.charCodeAt( pos ) == 65 ) state = 105;
		else state = -1;
		break;

	case 114:
		if( info.src.charCodeAt( pos ) == 69 ) state = 94;
		else state = -1;
		break;

	case 115:
		if( info.src.charCodeAt( pos ) == 79 ) state = 96;
		else state = -1;
		break;

	case 116:
		if( info.src.charCodeAt( pos ) == 78 ) state = 102;
		else state = -1;
		break;

	case 117:
		if( info.src.charCodeAt( pos ) == 84 ) state = 111;
		else state = -1;
		break;

	case 118:
		if( info.src.charCodeAt( pos ) == 84 ) state = 114;
		else state = -1;
		break;

	case 119:
		if( info.src.charCodeAt( pos ) == 65 ) state = 116;
		else state = -1;
		break;

	case 120:
		if( info.src.charCodeAt( pos ) == 78 ) state = 107;
		else state = -1;
		break;

	case 121:
		if( info.src.charCodeAt( pos ) == 65 ) state = 108;
		else state = -1;
		break;

	case 122:
		if( info.src.charCodeAt( pos ) == 73 ) state = 109;
		else if( info.src.charCodeAt( pos ) == 80 ) state = 110;
		else state = -1;
		break;

	case 123:
		if( info.src.charCodeAt( pos ) == 66 ) state = 112;
		else state = -1;
		break;

	case 124:
		if( info.src.charCodeAt( pos ) == 65 ) state = 118;
		else state = -1;
		break;

	case 125:
		if( info.src.charCodeAt( pos ) == 73 ) state = 115;
		else state = -1;
		break;

	case 126:
		if( info.src.charCodeAt( pos ) == 76 ) state = 121;
		else state = -1;
		break;

	case 127:
		if( info.src.charCodeAt( pos ) == 78 ) state = 122;
		else state = -1;
		break;

	case 128:
		if( info.src.charCodeAt( pos ) == 65 ) state = 117;
		else state = -1;
		break;

	case 129:
		if( info.src.charCodeAt( pos ) == 84 ) state = 128;
		else state = -1;
		break;

	case 130:
		if( info.src.charCodeAt( pos ) == 65 ) state = 123;
		else state = -1;
		break;

	case 131:
		if( info.src.charCodeAt( pos ) == 72 ) state = 130;
		else state = -1;
		break;

	case 132:
		if( info.src.charCodeAt( pos ) == 80 ) state = 131;
		else state = -1;
		break;

	case 133:
		if( info.src.charCodeAt( pos ) == 76 ) state = 132;
		else state = -1;
		break;

}


			pos++;

		}
		while( state > -1 );

	}
	while( 1 > -1 && match == 1 );

	if( match > -1 )
	{
		info.att = info.src.substr( start, match_pos - start );
		info.offset = match_pos;
		

	}
	else
	{
		info.att = new String();
		match = -1;
	}

	return match;
}


function __parse( src, err_off, err_la )
{
	var		sstack			= new Array();
	var		vstack			= new Array();
	var 	err_cnt			= 0;
	var		act;
	var		go;
	var		la;
	var		rval;
	var 	parseinfo		= new Function( "", "var offset; var src; var att;" );
	var		info			= new parseinfo();
	
	//Visual parse tree generation
	var 	treenode		= new Function( "", "var sym; var att; var child;" );
	var		treenodes		= new Array();
	var		tree			= new Array();
	var		tmptree			= null;

/* Pop-Table */
var pop_tab = new Array(
	new Array( 0/* TM' */, 1 ),
	new Array( 28/* TM */, 3 ),
	new Array( 28/* TM */, 3 ),
	new Array( 27/* definitioncomp */, 7 ),
	new Array( 29/* definitionincomp */, 5 ),
	new Array( 30/* states */, 3 ),
	new Array( 37/* statesmul */, 1 ),
	new Array( 37/* statesmul */, 3 ),
	new Array( 31/* alphabet */, 3 ),
	new Array( 38/* alphabetmul */, 1 ),
	new Array( 38/* alphabetmul */, 3 ),
	new Array( 32/* blank */, 3 ),
	new Array( 33/* initstate */, 3 ),
	new Array( 34/* endstate */, 3 ),
	new Array( 35/* transitions */, 3 ),
	new Array( 39/* transition */, 16 ),
	new Array( 39/* transition */, 0 ),
	new Array( 36/* input */, 3 ),
	new Array( 36/* input */, 0 )
);

/* Action-Table */
var act_tab = new Array(
	/* State 0 */ new Array( 5/* "TMSTART" */,2 ),
	/* State 1 */ new Array( 40/* "$" */,0 ),
	/* State 2 */ new Array( 7/* "STATESTART" */,7 , 11/* "BLANKSTART" */,8 ),
	/* State 3 */ new Array( 6/* "TMEND" */,9 ),
	/* State 4 */ new Array( 6/* "TMEND" */,10 ),
	/* State 5 */ new Array( 9/* "ALPHABETSTART" */,12 ),
	/* State 6 */ new Array( 13/* "INITSTATESTART" */,14 ),
	/* State 7 */ new Array( 26/* "STRING" */,16 ),
	/* State 8 */ new Array( 25/* "CHAR" */,17 ),
	/* State 9 */ new Array( 40/* "$" */,-2 ),
	/* State 10 */ new Array( 40/* "$" */,-1 ),
	/* State 11 */ new Array( 11/* "BLANKSTART" */,8 ),
	/* State 12 */ new Array( 25/* "CHAR" */,20 ),
	/* State 13 */ new Array( 15/* "ENDSTATESTART" */,22 ),
	/* State 14 */ new Array( 26/* "STRING" */,23 ),
	/* State 15 */ new Array( 8/* "STATESEND" */,24 ),
	/* State 16 */ new Array( 23/* "COMMA" */,25 , 8/* "STATESEND" */,-6 , 16/* "ENDSTATEND" */,-6 ),
	/* State 17 */ new Array( 12/* "BLANKEND" */,26 ),
	/* State 18 */ new Array( 13/* "INITSTATESTART" */,14 ),
	/* State 19 */ new Array( 10/* "ALPHABETEND" */,28 ),
	/* State 20 */ new Array( 23/* "COMMA" */,29 , 10/* "ALPHABETEND" */,-9 ),
	/* State 21 */ new Array( 17/* "TRANSITIONSSTART" */,31 ),
	/* State 22 */ new Array( 26/* "STRING" */,16 ),
	/* State 23 */ new Array( 14/* "INITSTATEND" */,33 ),
	/* State 24 */ new Array( 9/* "ALPHABETSTART" */,-5 ),
	/* State 25 */ new Array( 26/* "STRING" */,16 ),
	/* State 26 */ new Array( 13/* "INITSTATESTART" */,-11 ),
	/* State 27 */ new Array( 15/* "ENDSTATESTART" */,22 ),
	/* State 28 */ new Array( 11/* "BLANKSTART" */,-8 ),
	/* State 29 */ new Array( 25/* "CHAR" */,20 ),
	/* State 30 */ new Array( 21/* "INPUTSTART" */,38 , 6/* "TMEND" */,-18 ),
	/* State 31 */ new Array( 19/* "TRANSITIONSTART" */,40 , 18/* "TRANSITIONSEND" */,-16 ),
	/* State 32 */ new Array( 16/* "ENDSTATEND" */,41 ),
	/* State 33 */ new Array( 15/* "ENDSTATESTART" */,-12 ),
	/* State 34 */ new Array( 8/* "STATESEND" */,-7 , 16/* "ENDSTATEND" */,-7 ),
	/* State 35 */ new Array( 17/* "TRANSITIONSSTART" */,31 ),
	/* State 36 */ new Array( 10/* "ALPHABETEND" */,-10 ),
	/* State 37 */ new Array( 6/* "TMEND" */,-4 ),
	/* State 38 */ new Array( 26/* "STRING" */,43 ),
	/* State 39 */ new Array( 18/* "TRANSITIONSEND" */,44 ),
	/* State 40 */ new Array( 2/* "LEFTPARA" */,45 ),
	/* State 41 */ new Array( 17/* "TRANSITIONSSTART" */,-13 ),
	/* State 42 */ new Array( 21/* "INPUTSTART" */,38 , 6/* "TMEND" */,-18 ),
	/* State 43 */ new Array( 22/* "INPUTEND" */,47 ),
	/* State 44 */ new Array( 21/* "INPUTSTART" */,-14 , 6/* "TMEND" */,-14 ),
	/* State 45 */ new Array( 26/* "STRING" */,48 ),
	/* State 46 */ new Array( 6/* "TMEND" */,-3 ),
	/* State 47 */ new Array( 6/* "TMEND" */,-17 ),
	/* State 48 */ new Array( 23/* "COMMA" */,49 ),
	/* State 49 */ new Array( 25/* "CHAR" */,50 ),
	/* State 50 */ new Array( 3/* "RIGHTPARA" */,51 ),
	/* State 51 */ new Array( 4/* "ARROW" */,52 ),
	/* State 52 */ new Array( 2/* "LEFTPARA" */,53 ),
	/* State 53 */ new Array( 26/* "STRING" */,54 ),
	/* State 54 */ new Array( 23/* "COMMA" */,55 ),
	/* State 55 */ new Array( 25/* "CHAR" */,56 ),
	/* State 56 */ new Array( 23/* "COMMA" */,57 ),
	/* State 57 */ new Array( 24/* "DIRECTION" */,58 ),
	/* State 58 */ new Array( 3/* "RIGHTPARA" */,59 ),
	/* State 59 */ new Array( 20/* "TRANSITIONEND" */,60 ),
	/* State 60 */ new Array( 19/* "TRANSITIONSTART" */,40 , 18/* "TRANSITIONSEND" */,-16 ),
	/* State 61 */ new Array( 18/* "TRANSITIONSEND" */,-15 )
);

/* Goto-Table */
var goto_tab = new Array(
	/* State 0 */ new Array( 28/* TM */,1 ),
	/* State 1 */ new Array(  ),
	/* State 2 */ new Array( 29/* definitionincomp */,3 , 27/* definitioncomp */,4 , 30/* states */,5 , 32/* blank */,6 ),
	/* State 3 */ new Array(  ),
	/* State 4 */ new Array(  ),
	/* State 5 */ new Array( 31/* alphabet */,11 ),
	/* State 6 */ new Array( 33/* initstate */,13 ),
	/* State 7 */ new Array( 37/* statesmul */,15 ),
	/* State 8 */ new Array(  ),
	/* State 9 */ new Array(  ),
	/* State 10 */ new Array(  ),
	/* State 11 */ new Array( 32/* blank */,18 ),
	/* State 12 */ new Array( 38/* alphabetmul */,19 ),
	/* State 13 */ new Array( 34/* endstate */,21 ),
	/* State 14 */ new Array(  ),
	/* State 15 */ new Array(  ),
	/* State 16 */ new Array(  ),
	/* State 17 */ new Array(  ),
	/* State 18 */ new Array( 33/* initstate */,27 ),
	/* State 19 */ new Array(  ),
	/* State 20 */ new Array(  ),
	/* State 21 */ new Array( 35/* transitions */,30 ),
	/* State 22 */ new Array( 37/* statesmul */,32 ),
	/* State 23 */ new Array(  ),
	/* State 24 */ new Array(  ),
	/* State 25 */ new Array( 37/* statesmul */,34 ),
	/* State 26 */ new Array(  ),
	/* State 27 */ new Array( 34/* endstate */,35 ),
	/* State 28 */ new Array(  ),
	/* State 29 */ new Array( 38/* alphabetmul */,36 ),
	/* State 30 */ new Array( 36/* input */,37 ),
	/* State 31 */ new Array( 39/* transition */,39 ),
	/* State 32 */ new Array(  ),
	/* State 33 */ new Array(  ),
	/* State 34 */ new Array(  ),
	/* State 35 */ new Array( 35/* transitions */,42 ),
	/* State 36 */ new Array(  ),
	/* State 37 */ new Array(  ),
	/* State 38 */ new Array(  ),
	/* State 39 */ new Array(  ),
	/* State 40 */ new Array(  ),
	/* State 41 */ new Array(  ),
	/* State 42 */ new Array( 36/* input */,46 ),
	/* State 43 */ new Array(  ),
	/* State 44 */ new Array(  ),
	/* State 45 */ new Array(  ),
	/* State 46 */ new Array(  ),
	/* State 47 */ new Array(  ),
	/* State 48 */ new Array(  ),
	/* State 49 */ new Array(  ),
	/* State 50 */ new Array(  ),
	/* State 51 */ new Array(  ),
	/* State 52 */ new Array(  ),
	/* State 53 */ new Array(  ),
	/* State 54 */ new Array(  ),
	/* State 55 */ new Array(  ),
	/* State 56 */ new Array(  ),
	/* State 57 */ new Array(  ),
	/* State 58 */ new Array(  ),
	/* State 59 */ new Array(  ),
	/* State 60 */ new Array( 39/* transition */,61 ),
	/* State 61 */ new Array(  )
);



/* Symbol labels */
var labels = new Array(
	"TM'" /* Non-terminal symbol */,
	"WHITESPACE" /* Terminal symbol */,
	"LEFTPARA" /* Terminal symbol */,
	"RIGHTPARA" /* Terminal symbol */,
	"ARROW" /* Terminal symbol */,
	"TMSTART" /* Terminal symbol */,
	"TMEND" /* Terminal symbol */,
	"STATESTART" /* Terminal symbol */,
	"STATESEND" /* Terminal symbol */,
	"ALPHABETSTART" /* Terminal symbol */,
	"ALPHABETEND" /* Terminal symbol */,
	"BLANKSTART" /* Terminal symbol */,
	"BLANKEND" /* Terminal symbol */,
	"INITSTATESTART" /* Terminal symbol */,
	"INITSTATEND" /* Terminal symbol */,
	"ENDSTATESTART" /* Terminal symbol */,
	"ENDSTATEND" /* Terminal symbol */,
	"TRANSITIONSSTART" /* Terminal symbol */,
	"TRANSITIONSEND" /* Terminal symbol */,
	"TRANSITIONSTART" /* Terminal symbol */,
	"TRANSITIONEND" /* Terminal symbol */,
	"INPUTSTART" /* Terminal symbol */,
	"INPUTEND" /* Terminal symbol */,
	"COMMA" /* Terminal symbol */,
	"DIRECTION" /* Terminal symbol */,
	"CHAR" /* Terminal symbol */,
	"STRING" /* Terminal symbol */,
	"definitioncomp" /* Non-terminal symbol */,
	"TM" /* Non-terminal symbol */,
	"definitionincomp" /* Non-terminal symbol */,
	"states" /* Non-terminal symbol */,
	"alphabet" /* Non-terminal symbol */,
	"blank" /* Non-terminal symbol */,
	"initstate" /* Non-terminal symbol */,
	"endstate" /* Non-terminal symbol */,
	"transitions" /* Non-terminal symbol */,
	"input" /* Non-terminal symbol */,
	"statesmul" /* Non-terminal symbol */,
	"alphabetmul" /* Non-terminal symbol */,
	"transition" /* Non-terminal symbol */,
	"$" /* Terminal symbol */
);


	
	info.offset = 0;
	info.src = src;
	info.att = new String();
	
	if( !err_off )
		err_off	= new Array();
	if( !err_la )
	err_la = new Array();
	
	sstack.push( 0 );
	vstack.push( 0 );
	
	la = __lex( info );
			
	while( true )
	{
		act = 63;
		for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
		{
			if( act_tab[sstack[sstack.length-1]][i] == la )
			{
				act = act_tab[sstack[sstack.length-1]][i+1];
				break;
			}
		}

		/*
		_print( "state " + sstack[sstack.length-1] + " la = " + la + " info.att = >" +
				info.att + "< act = " + act + " src = >" + info.src.substr( info.offset, 30 ) + "..." + "<" +
					" sstack = " + sstack.join() );
		*/
		
		if( _dbg_withtrace && sstack.length > 0 )
		{
			__dbg_print( "\nState " + sstack[sstack.length-1] + "\n" +
							"\tLookahead: " + labels[la] + " (\"" + info.att + "\")\n" +
							"\tAction: " + act + "\n" + 
							"\tSource: \"" + info.src.substr( info.offset, 30 ) + ( ( info.offset + 30 < info.src.length ) ?
									"..." : "" ) + "\"\n" +
							"\tStack: " + sstack.join() + "\n" +
							"\tValue stack: " + vstack.join() + "\n" );
			
			if( _dbg_withstepbystep )
				__dbg_wait();
		}
		
			
		//Panic-mode: Try recovery when parse-error occurs!
		if( act == 63 )
		{
			if( _dbg_withtrace )
				__dbg_print( "Error detected: There is no reduce or shift on the symbol " + labels[la] );
			
			err_cnt++;
			err_off.push( info.offset - info.att.length );			
			err_la.push( new Array() );
			for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
				err_la[err_la.length-1].push( labels[act_tab[sstack[sstack.length-1]][i]] );
			
			//Remember the original stack!
			var rsstack = new Array();
			var rvstack = new Array();
			for( var i = 0; i < sstack.length; i++ )
			{
				rsstack[i] = sstack[i];
				rvstack[i] = vstack[i];
			}
			
			while( act == 63 && la != 40 )
			{
				if( _dbg_withtrace )
					__dbg_print( "\tError recovery\n" +
									"Current lookahead: " + labels[la] + " (" + info.att + ")\n" +
									"Action: " + act + "\n\n" );
				if( la == -1 )
					info.offset++;
					
				while( act == 63 && sstack.length > 0 )
				{
					sstack.pop();
					vstack.pop();
					
					if( sstack.length == 0 )
						break;
						
					act = 63;
					for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
					{
						if( act_tab[sstack[sstack.length-1]][i] == la )
						{
							act = act_tab[sstack[sstack.length-1]][i+1];
							break;
						}
					}
				}
				
				if( act != 63 )
					break;
				
				for( var i = 0; i < rsstack.length; i++ )
				{
					sstack.push( rsstack[i] );
					vstack.push( rvstack[i] );
				}
				
				la = __lex( info );
			}
			
			if( act == 63 )
			{
				if( _dbg_withtrace )
					__dbg_print( "\tError recovery failed, terminating parse process..." );
				break;
			}


			if( _dbg_withtrace )
				__dbg_print( "\tError recovery succeeded, continuing" );
		}
		
		/*
		if( act == 63 )
			break;
		*/
		
		
		//Shift
		if( act > 0 )
		{
			//Parse tree generation
			if( _dbg_withparsetree )
			{
				var node = new treenode();
				node.sym = labels[ la ];
				node.att = info.att;
				node.child = new Array();
				tree.push( treenodes.length );
				treenodes.push( node );
			}
			
			if( _dbg_withtrace )
				__dbg_print( "Shifting symbol: " + labels[la] + " (" + info.att + ")" );
		
			sstack.push( act );
			vstack.push( info.att );
			
			la = __lex( info );
			
			if( _dbg_withtrace )
				__dbg_print( "\tNew lookahead symbol: " + labels[la] + " (" + info.att + ")" );
		}
		//Reduce
		else
		{		
			act *= -1;
			
			if( _dbg_withtrace )
				__dbg_print( "Reducing by producution: " + act );
			
			rval = void(0);
			
			if( _dbg_withtrace )
				__dbg_print( "\tPerforming semantic action..." );
			
switch( act )
{
	case 0:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 1:
	{
		rval = vstack[ vstack.length - 3 ];
	}
	break;
	case 2:
	{
		rval = vstack[ vstack.length - 3 ];
	}
	break;
	case 3:
	{
		rval = vstack[ vstack.length - 7 ];
	}
	break;
	case 4:
	{
		rval = vstack[ vstack.length - 5 ];
	}
	break;
	case 5:
	{
		rval = vstack[ vstack.length - 3 ];
	}
	break;
	case 6:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 7:
	{
		rval = vstack[ vstack.length - 3 ];
	}
	break;
	case 8:
	{
		rval = vstack[ vstack.length - 3 ];
	}
	break;
	case 9:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 10:
	{
		rval = vstack[ vstack.length - 3 ];
	}
	break;
	case 11:
	{
		rval = vstack[ vstack.length - 3 ];
	}
	break;
	case 12:
	{
		rval = vstack[ vstack.length - 3 ];
	}
	break;
	case 13:
	{
		rval = vstack[ vstack.length - 3 ];
	}
	break;
	case 14:
	{
		rval = vstack[ vstack.length - 3 ];
	}
	break;
	case 15:
	{
		rval = vstack[ vstack.length - 16 ];
	}
	break;
	case 16:
	{
		rval = vstack[ vstack.length - 0 ];
	}
	break;
	case 17:
	{
		rval = vstack[ vstack.length - 3 ];
	}
	break;
	case 18:
	{
		rval = vstack[ vstack.length - 0 ];
	}
	break;
}


			
			if( _dbg_withparsetree )
				tmptree = new Array();

			if( _dbg_withtrace )
				__dbg_print( "\tPopping " + pop_tab[act][1] + " off the stack..." );
				
			for( var i = 0; i < pop_tab[act][1]; i++ )
			{
				if( _dbg_withparsetree )
					tmptree.push( tree.pop() );
					
				sstack.pop();
				vstack.pop();
			}
									
			go = -1;
			for( var i = 0; i < goto_tab[sstack[sstack.length-1]].length; i+=2 )
			{
				if( goto_tab[sstack[sstack.length-1]][i] == pop_tab[act][0] )
				{
					go = goto_tab[sstack[sstack.length-1]][i+1];
					break;
				}
			}
			
			if( _dbg_withparsetree )
			{
				var node = new treenode();
				node.sym = labels[ pop_tab[act][0] ];
				node.att = new String();
				node.child = tmptree.reverse();
				tree.push( treenodes.length );
				treenodes.push( node );
			}
			
			if( act == 0 )
				break;
				
			if( _dbg_withtrace )
				__dbg_print( "\tPushing non-terminal " + labels[ pop_tab[act][0] ] );
				
			sstack.push( go );
			vstack.push( rval );			
		}
	}

	if( _dbg_withtrace )
		__dbg_print( "\nParse complete." );

	if( _dbg_withparsetree )
	{
		if( err_cnt == 0 )
		{
			__dbg_print( "\n\n--- Parse tree ---" );
			__dbg_parsetree( 0, treenodes, tree );
		}
		else
		{
			__dbg_print( "\n\nParse tree cannot be viewed. There where parse errors." );
		}
	}
	
	return err_cnt;
}


function __dbg_parsetree( indent, nodes, tree )
{
	var str = new String();
	
	for( var i = 0; i < tree.length; i++ )
	{
		str = nodes[ tree[i] ].sym;
		if( nodes[ tree[i] ].att != "" )
			semTree.push([str,nodes[ tree[i] ].att]);
			
		if( nodes[ tree[i] ].child.length > 0 )
			__dbg_parsetree( indent + 1, nodes, nodes[ tree[i] ].child );
	}
}



function verifySemantic(){
	
	var state, statesPresent=false, alphabetPresent=false, counter=0, inputString="", statesWithEntry=[];
	
	alphabet=[],states=[],blank='',initial="",final=[],transitions=[],input=[];
		
	for(var i=0; i<semTree.length;i++){

		if(semTree[i][0] ==='STATESTART'){
			state='states';
			statesPresent=true;
			continue;
		}
		else if(semTree[i][0] ==='ALPHABETSTART'){
			state='alphabet';
			alphabetPresent=true;
			continue;
		}
		else if(semTree[i][0] ==='BLANKSTART'){
			state='blank';
			continue;
		}
		else if(semTree[i][0] === 'INITSTATESTART'){
			state='initial';
			continue;
		}
		else if(semTree[i][0] === 'ENDSTATESTART'){
			state='final';
			continue;
		}
		else if(semTree[i][0] === 'TRANSITIONSTART'){
			state='transition';
			continue;
		}	
		else if(semTree[i][0] === 'INPUTSTART'){
			state='input';
			continue;		
		}
		else if(semTree[i][0] === 'INPUTEND'){
			state='end';
			continue;
		}
		
		switch(state){
			case 'states':
				if(semTree[i][0] === 'STRING' && (states.indexOf(semTree[i][1])==-1))
				{
					states.push(semTree[i][1]);
					statesPresent=true;
				}
				else if(states.indexOf(semTree[i][1])!=-1){
					validTM = "F";
					updateVerifyUI();
					parserVerifyAlert("Multiple States with same Name "+semTree[i][1]);
					
					return;
				}
				break;
			case 'alphabet':
				if(semTree[i][0] === 'CHAR' && (alphabet.indexOf(semTree[i][1])==-1))
				{
					alphabet.push(semTree[i][1]);
					alphabetPresent=true;
				}
				else if(alphabet.indexOf(semTree[i][1])!=-1){
					validTM = "F";
					updateVerifyUI();
					parserVerifyAlert("Alphabet Symbol " + semTree[i][1] + " Repetition");
					
					return;
				}
				break;
			case 'blank':
				if(semTree[i][0] === 'CHAR')
				{
					if((alphabet.indexOf(semTree[i][1])!=-1) && alphabetPresent)
						blank=semTree[i][1];
					else if(!alphabetPresent){
						alphabet.push(semTree[i][1]);
						blank=semTree[i][1];
					}
					else{
						validTM = "F";
						updateVerifyUI();
						parserVerifyAlert("Blank Symbol " + semTree[i][1] + " not in Alphabet definition");
						
						return;
					}
				}
				break;
			case 'initial':
				if(semTree[i][0] === 'STRING')
				{
					if((states.indexOf(semTree[i][1]))!=-1 && statesPresent)
						initial=semTree[i][1];
					else if(!statesPresent){
						states.push(semTree[i][1]);
						blank=semTree[i][1];
					}
					else{
						validTM = "F";
						updateVerifyUI();
						parserVerifyAlert("Initial State " + semTree[i][1] + " not in States definition");
						
						return;
					}
				}
				break;
			case 'final':
				if(semTree[i][0] === 'STRING')
				{
					if((states.indexOf(semTree[i][1])!=-1) && statesPresent)
						final.push(semTree[i][1]);
					else if(!statesPresent){
						if(states.indexOf(semTree[i][1])==-1){
							states.push(semTree[i][1]);
							final.push(semTree[i][1]);
						}
						else{
							parserVerifyAlert("Final State "+semTree[i][1]+" repetition");
						}
						
					}
					else if(states.indexOf(semTree[i][1])==-1){
							parserVerifyAlert("Final State "+semTree[i][1]+" repetition");
					}
					else{
						validTM = "F";
						updateVerifyUI();
						parserVerifyAlert("Final State "+ semTree[i][1] + " not in States definition");
						
						return;
					}
				}
				break;
			case 'transition':
				if(semTree[i][0] === 'STRING')
				{

					var transition=[];
					counter++;
					if((states.indexOf(semTree[i][1])!=-1) && statesPresent)
						transition.push(semTree[i][1]);
					else if(!statesPresent){
						if((states.indexOf(semTree[i][1])==-1))
							states.push(semTree[i][1]);
						transition.push(semTree[i][1]);
					}
					else{
						validTM = "F";
						updateVerifyUI();
						parserVerifyAlert("State " + semTree[i][1] + " in transition " + counter + " not present in States definition");
						
						return;
					}
					
					i+=2;
					
					if((alphabet.indexOf(semTree[i][1])!=-1) && alphabetPresent)
						transition.push(semTree[i][1]);
					else if(!alphabetPresent){
						if(alphabet.indexOf(semTree[i][1])==-1)
							alphabet.push(semTree[i][1]);
						transition.push(semTree[i][1]);
					}
					else{
						validTM = "F";
						updateVerifyUI();
						parserVerifyAlert("Symbol " + semTree[i][1] + " in transition " + counter + " not present in Alphabet definition");
						
						return;
					}
					
					i+=4;
					if((statesWithEntry.indexOf(semTree[i][1])==-1))
							statesWithEntry.push(semTree[i][1]);
					
					if((states.indexOf(semTree[i][1])!=-1) && statesPresent)
						transition.push(semTree[i][1]);
					else if(!statesPresent){
						if((states.indexOf(semTree[i][1])==-1))
							states.push(semTree[i][1]);
						transition.push(semTree[i][1]);
					}
					else{
						validTM = "F";
						updateVerifyUI();
						parserVerifyAlert("State " + semTree[i][1] + " in transition " + counter + " not present in States definition");
						
						return;
					}
					
					i+=2;

					if((alphabet.indexOf(semTree[i][1])!=-1) && alphabetPresent)
						transition.push(semTree[i][1]);
					else if(!alphabetPresent){
						if(alphabet.indexOf(semTree[i][1])==-1)
							alphabet.push(semTree[i][1]);
						transition.push(semTree[i][1]);
					}
					else{
						validTM = "F";
						updateVerifyUI();
						parserVerifyAlert("Symbol " + semTree[i][1] + " in transition " + counter + " not present in Alphabet definition");
						
						return;
					}
					
					i+=2;
					
					transition.push(semTree[i][1]);
					
					if(transitions.indexOf(transition)!=-1){
						validTM = "F";
						updateVerifyUI();
						parserVerifyAlert("Transition "+transition+" Repetition");
						
						return;
					}
					for(var j=0;j<transitions.length;j++){
						if(transitions[j]['stateA']===transition[0]&&transitions[j]['input']===transition[1])
						{
							console.log(transitions[j]['stateA']);
							console.log(transitions[j]);
							console.log(transition[0]);
							console.log(transition[1]);
							
							validTM = "F";
							updateVerifyUI();
							parserVerifyAlert("Transition "+transition+" has same initial state and symbol as "+transitions[j].toString());
						
							return;
						}
					}
					
					transitions.push(new Transition(transition[0],transition[1],transition[2],transition[3],transition[4]));
					
				}
				break;
			case 'input':
				if(semTree[i][0] === 'STRING')
				{
					inputString=semTree[i][1];
					var inp = semTree[i][1].split("");
					for(var j=0;j<inp.length;j++){
						if(alphabet.indexOf(inp[j])==-1)
						{
							validTM = 'F';
							updateVerifyUI();
							parserVerifyAlert("Symbol "+inp[j]+" in input "+semTree[i][1]+" not present in Alphabet definition");
							
							return;	
						}
					}
				}
				break;
			case 'end':
				var def = new Definition(
						states,alphabet,blank,initial,final
				);
				var newStates = states.slice();
				
				newStates.splice(newStates.indexOf(initial),1);
				
				for(var t=0; t<newStates.length; t++){
					for(var v=0; v<statesWithEntry.length; v++){
						if(newStates.indexOf(statesWithEntry[v])!==-1){
							newStates.splice(newStates.indexOf(statesWithEntry[v]),1);
						}
					}
				}
				if(newStates.length!==0)
					alert("States without entry point:"+JSON.stringify(newStates));
				
				
				tMachine = new TuringMachine(def, transitions);
				$("#tminput").val(inputString);
				validTM = "T";
				updateVerifyUI();
				
				$("#verifyAlert").hide();
				
				return;
			default:
				break;
		}
	}
}

function parserVerifyAlert( msg ) {

	$("#verifyAlert").removeClass("alert-warning");
	$("#verifyAlert").addClass("alert-danger");
	$("#verifyAlert").last().text(msg);

	$("#verifyAlert").show(300);

}