<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<link rel="icon" type="image/png" href="assets/img/m.ico">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

	<title>WISP</title>

	<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <meta name="viewport" content="width=device-width" />


    <!-- Bootstrap core CSS     -->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" />

    <!-- Animation library for notifications   -->
    <link href="assets/css/animate.min.css" rel="stylesheet"/>

    <!--  Light Bootstrap Table core CSS    -->
    <link href="assets/css/light-bootstrap-dashboard.css?v=1.4.0" rel="stylesheet"/>


    <!--  CSS for Demo Purpose, don't include it in your project     -->
    <link href="assets/css/demo.css" rel="stylesheet" />


    <!--     Fonts and icons     -->
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,700,300' rel='stylesheet' type='text/css'>
    <link href="assets/css/pe-icon-7-stroke.css" rel="stylesheet" />

</head>
<body>

<div class="wrapper">
    <div class="sidebar" data-color="azure" data-image="assets/img/sidebar-5.jpg">

    <!--

        Tip 1: you can change the color of the sidebar using: data-color="blue | azure | green | orange | red | purple"
        Tip 2: you can also add an image using data-image tag

    -->

    		<div class="sidebar-wrapper">
            <div class="logo">
                <a href="http://www.creative-tim.com" class="simple-text">
                    Hotel Hotspot Manager
                </a>
            </div>

            <ul class="nav">
                <li class="active">
                    <a href="dashboard.php">
                        <i class="pe-7s-graph"></i>
                        <p>POČETNA</p>
                    </a>
                </li>
                <li>
                    <a href="admin.html">
                        <i class="pe-7s-user"></i>
                        <p>ADMINISTRATOR</p>
                    </a>
                </li>
                <li>
                    <a href="klijenti.php">
                        <i class="pe-7s-note2"></i>
                        <p>KORISNICI</p>
                    </a>
                </li>
                <li>
                    <a href="profili.php">
                        <i class="pe-7s-news-paper"></i>
                        <p>PROFILI</p>
                    </a>
                </li>
 
				
            </ul>
    	</div>
    </div>
	
	<!-- Slijedi izbornik -->

    <div class="main-panel">
       <nav class="navbar navbar-default navbar-fixed">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Dashboard</a>
                </div>
				<!-- Ovo je obavijesni izbornik  -->
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav navbar-left">
					<!-- Ovo je prvi -->
                        <li>
                            <a href="admin.php" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-dashboard"></i>
								<p class="hidden-lg hidden-md">STATISTIKE</p>
                            </a>
                        </li>
						<!-- Ovo je za obavijesti - DOVRŠITI -->
                        <li class="dropdown">
                              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <i class="fa fa-globe"></i>
                                    <b class="caret hidden-lg hidden-md"></b>
									<p class="hidden-lg hidden-md">
										OBAVIJESTI
										<b class="caret"></b>
									</p>
                              </a>
                        </li>           
                    </ul>

                    <ul class="nav navbar-nav navbar-right">
                       
						<!-- Ovo je možda za dodatni izbornik - IZBACITI/DOVRŠITI -->
                        <li class="dropdown">
                              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <p>	Opcije
										<b class="caret"></b>
									</p>

                              </a>
                              <ul class="dropdown-menu">
							  <!-- Ovo je za obavijesti - poveži s admin -->
                                <li><a href="admin.html">Moj račun</a></li>                             
                                <li class="divider"></li>
                                <li><a href="#">LOG OUT</a></li>
                              </ul>
                        </li>
                        
						<li class="separator hidden-lg"></li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="header">
                                <h4 class="title">HOTSPOT KORISNICI</h4>
                                <p class="category">Korisnici se učitavaju iz baze WISP iz tablice USERS</p>
                            </div>
                            <div class="content table-responsive table-full-width">
                                <table class="table table-hover table-striped">
                                    <thead>
                                        <th>ID</th>
                                    	<th>Ime</th>
                                    	<th>Prezime</th>
										<th>Profil</th>
										<th>IP</th>
                                    	<th>MAC</th>
                                    </thead>
									<tbody>
                                    </tbody>
									<!-- Vezanje tablice i baze za korisnike -->
									<?php include 'php/ispis_korisnika.php';?>		
                                </table>

                            </div>
                        </div>
                    </div>
						<!-- Forma za dodavanje novih korisnika i upis u DB -->
						<form action="php/hotspot/add_new_hotspot_user.php" method="post">
							<h3>Dodaj nove korisnike</h3>	
							<label>ID</label>
							<input type="text" name="post_id"> <br>
							<label>Ime</label>
							<input type="text" name="post_ime"><br>
							<label>Prezime</label>
							<input type="text" name="post_prez"><br>
							<label>Profil</label>
							<input type="text" name="post_profil"><br>
							<label>Vrijeme</label>
							<input type="text" name="post_uptime"><br>
							<label>IP</label>
							<input type="text" name="post_ip"><br>
							<label>MAC</label>
							<input type="text" name="post_mac"><br>
							<input type="submit" value="UNESI U BAZU">
						</form>


                </div>
            </div>
        </div>

         <footer class="footer">
           
                <p class="copyright pull-right">
                    &copy; <script>document.write(new Date().getFullYear())</script> <a href="">HM</a>, jednostavno upravljanje HOTSPOTOM
                </p>
            </div>
        </footer>


    </div>
</div>


</body>

    <!--   Core JS Files   -->
    <script src="assets/js/jquery.3.2.1.min.js" type="text/javascript"></script>
	<script src="assets/js/bootstrap.min.js" type="text/javascript"></script>

	<!--  Charts Plugin -->
	<script src="assets/js/chartist.min.js"></script>

    <!--  Notifications Plugin    -->
    <script src="assets/js/bootstrap-notify.js"></script>

    <!--  Google Maps Plugin    
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
	-->

    <!-- Light Bootstrap Table Core javascript and methods for Demo purpose -->
	<script src="assets/js/light-bootstrap-dashboard.js?v=1.4.0"></script>

	<!-- Light Bootstrap Table DEMO methods, don't include it in your project! -->
	<script src="assets/js/demo.js"></script>


</html>
